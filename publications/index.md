---
layout: page
title: Selected Publications
permalink: /publications/
---

Please take a look at my [Google Scholar profile](https://scholar.google.fr/citations?user=DuiyaQoAAAAJ&hl=fr) for the most recent list
<br><br>
The complete list of publications can also be found in my CV


# Selected publications

Redouane Lguensat, Pierre Tandeo, Pierre Ailliot, Manuel Pulido and Ronan Fablet. **The Analog Data Assimilation**. Monthly Weather Review, 2017, vol. 145, no 10, p. 4093-4107. [journal webpage](http://journals.ametsoc.org/doi/abs/10.1175/MWR-D-16-0441.1){:target="_blank"}

<br><br>

Maike Sonnewald and Redouane Lguensat. **Revealing the impact of global heating on North Atlantic circulation using transparent machine learning**. Journal of Advances in Modeling Earth Systems, 13, e2021MS002496. [journal webpage](https://doi.org/10.1029/2021MS002496){:target="_blank"}

<br><br>

Review paper:

**Bridging observations, theory and numerical simulation of the ocean using machine learning**. Environmental Research Letters. [journal webpage](https://iopscience.iop.org/article/10.1088/1748-9326/ac0eb0){:target="_blank"}

<br><br>

{% comment %}
### Journal
{% for paper in site.data.publications.journal %}
 * {{paper.author}}. [{{paper.title}}]({{paper.url}}). *{{paper.journal}}*. Volume {{paper.volume}}-{{paper.number}}. Pages {{paper.pages}}. {{paper.year}}
{% endfor %}
### Conference
{% for paper in site.data.publications.conference %}
 * {{paper.author}}. [{{paper.title}}]({{paper.url}}). *{{paper.conference}}*. {{paper.year}}
{% endfor %}
{% endcomment %}
