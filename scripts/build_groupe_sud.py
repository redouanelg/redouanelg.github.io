"""Build the dataset behind the Groupe Sud IPSL globe (/groupesudIPSL/).

For each "pays du Sud" in IRD's sense, list the IPSL lab
researchers who co-authored at least MIN_PAPERS papers with someone affiliated in that
country over the last YEARS years. Papers with more than MAX_AUTHORS authors are skipped,
so large consortium papers don't link everyone to every country.

IRD publishes no country list: its calls (LMI, JEAI, IRN) target "pays de la zone intertropicale
et méditerranéenne". We approximate this with World Bank low and middle-income countries in
Africa, Latin America and the Caribbean, South Asia, East Asia and the Pacific, and the Middle
East and North Africa, leaving out Europe and Central Asia and the EXCLUDE list below.

Sources: OpenAlex (papers), World Bank API (income groups, regions), ISO 3166 table (numeric
codes used by the globe's country shapes). Standard library only.

Run from the repository root:  python3 scripts/build_groupe_sud.py
"""
import csv
import io
import json
import time
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import date, timedelta

LABS = {  # OpenAlex institution id -> lab acronym
    "I4210114102": "IPSL",
    "I4210124937": "LSCE",
    "I4210087306": "LMD",
    "I4210154188": "LOCEAN",
    "I4210154535": "LATMOS",
    "I4210135273": "LISA",
    "I4210112279": "METIS",
    "I4210130371": "CEREA",
    "I4210146095": "GEOPS",
}
YEARS = 5
MAX_AUTHORS = 30
MIN_PAPERS = 2
PAPERS_SHOWN = 3
# World Bank regions kept (Europe & Central Asia "ECS" and North America "NAC" are left out)
REGIONS = {"SSF": "africa", "LCN": "americas", "SAS": "south_asia", "EAS": "asia_pacific", "MEA": "mena"}
EXCLUDE = {"CN", "MN", "KP"}  # outside IRD's intertropical and Mediterranean zone
REGION_FIX = {"AF": "south_asia", "PK": "south_asia"}  # the World Bank groups them with the Middle East
# Publications only: datasets, peer-review comments and conference abstracts would inflate counts
TYPES = "article|review|preprint|book-chapter|book|conference-paper|data-paper"
OUT = "groupesudIPSL/data/groupe_sud.json"

WORLD_BANK = "https://api.worldbank.org/v2/country?format=json&per_page=400"
ISO_TABLE = "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv"
OPENALEX = "https://api.openalex.org/works"


def get(url, retries=4):
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                return r.read().decode("utf-8")
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))


def global_south():
    """ISO2 -> {name, income, region} for IRD's "pays du Sud" (see module docstring)."""
    rows = json.loads(get(WORLD_BANK))[1]
    return {c["iso2Code"]: {"name": c["name"], "income": c["incomeLevel"]["id"],
                            "region": REGION_FIX.get(c["iso2Code"], REGIONS[c["region"]["id"]])}
            for c in rows
            if c["incomeLevel"]["id"] in ("LIC", "LMC", "UMC") and c["region"]["id"] in REGIONS
            and c["iso2Code"] not in EXCLUDE}


def iso_numeric():
    table = csv.DictReader(io.StringIO(get(ISO_TABLE)))
    return {row["alpha-2"]: row["country-code"] for row in table}


def fetch_works(countries, since):
    """Papers with an IPSL lab author and an author affiliated in one of `countries`."""
    works = {}
    codes = sorted(countries)
    for i in range(0, len(codes), 50):
        chunk = "|".join(codes[i:i + 50])
        flt = (f"institutions.id:{'|'.join(LABS)},institutions.country_code:{chunk},"
               f"from_publication_date:{since},authors_count:<{MAX_AUTHORS + 1},type:{TYPES}")
        # Plain page numbers: cursor paging needs an OpenAlex API key (pages work up to 10,000 results)
        page_no = 1
        while True:
            q = urllib.parse.urlencode({"filter": flt, "per_page": 200, "page": page_no,
                                        "select": "id,doi,title,publication_year,authorships"})
            page = json.loads(get(f"{OPENALEX}?{q}"))
            for w in page["results"]:
                works[w["id"]] = w
            if len(page["results"]) < 200:
                break
            page_no += 1
            time.sleep(0.15)
        print(f"  countries {i + 1}-{min(i + 50, len(codes))}: {len(works)} papers so far")
    return works


def lab_of(institution):
    """Most specific IPSL lab for an institution (a lab beats the IPSL umbrella)."""
    ids = [institution["id"]] + (institution.get("lineage") or [])
    found = [LABS[x.rsplit("/", 1)[-1]] for x in ids if x.rsplit("/", 1)[-1] in LABS]
    specific = [f for f in found if f != "IPSL"]
    return specific[0] if specific else (found[0] if found else None)


def main():
    since = (date.today() - timedelta(days=365 * YEARS)).isoformat()
    print("Global South countries...")
    gs = global_south()
    numeric = iso_numeric()
    print(f"  {len(gs)} countries")
    print(f"OpenAlex papers since {since}...")
    works = fetch_works(gs, since)

    links = defaultdict(lambda: defaultdict(list))   # country -> author id -> papers
    authors = {}                                     # author id -> name, orcid
    author_labs = defaultdict(Counter)               # author id -> lab counts
    papers_per_country = defaultdict(set)

    for w in works.values():
        ipsl, partners = [], set()
        for a in w["authorships"]:
            labs = [lab for lab in map(lab_of, a.get("institutions") or []) if lab]
            for inst in a.get("institutions") or []:
                if inst.get("country_code") in gs:
                    partners.add(inst["country_code"])
            partners.update(c for c in a.get("countries") or [] if c in gs)
            if labs and a["author"].get("id"):
                aid = a["author"]["id"].rsplit("/", 1)[-1]
                authors[aid] = {"name": a["author"]["display_name"], "orcid": a["author"].get("orcid")}
                author_labs[aid].update(labs)
                ipsl.append(aid)
        url = w.get("doi") or w["id"]
        paper = {"title": w.get("title") or "", "year": w.get("publication_year"), "url": url}
        for cc in partners:
            papers_per_country[cc].add(w["id"])
            for aid in set(ipsl):
                links[cc][aid].append(paper)

    def best_lab(aid):
        counts = author_labs[aid]
        specific = [(n, lab) for lab, n in counts.items() if lab != "IPSL"]
        return max(specific)[1] if specific else "IPSL"

    countries = {}
    for cc, info in sorted(gs.items()):
        researchers = []
        for aid, papers in links.get(cc, {}).items():
            if len(papers) < MIN_PAPERS:
                continue
            papers = sorted(papers, key=lambda p: p["year"] or 0, reverse=True)
            researchers.append({
                "name": authors[aid]["name"], "openalex": aid, "orcid": authors[aid]["orcid"],
                "lab": best_lab(aid), "n": len(papers), "last": papers[0]["year"],
                "papers": papers[:PAPERS_SHOWN],
            })
        researchers.sort(key=lambda r: (-r["n"], r["name"]))
        countries[cc] = {"name": info["name"], "income": info["income"], "region": info["region"],
                         "numeric": numeric.get(cc),
                         "papers": len(papers_per_country.get(cc, ())), "researchers": researchers}

    data = {
        "generated": date.today().isoformat(), "since": since,
        "criteria": {"years": YEARS, "max_authors": MAX_AUTHORS, "min_papers": MIN_PAPERS,
                     "types": TYPES.split("|"), "labs": sorted(set(LABS.values()))},
        "total_papers": len(works), "countries": countries,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    linked = sum(1 for c in countries.values() if c["researchers"])
    people = len({r["openalex"] for c in countries.values() for r in c["researchers"]})
    print(f"Wrote {OUT}: {len(works)} papers, {linked} countries with researchers, {people} researchers")


if __name__ == "__main__":
    main()
