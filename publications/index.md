---
layout: page
title: Selected Publications
permalink: /publications/
---

For a complete and up-to-date list with citation counts, see my [Google Scholar profile](https://scholar.google.fr/citations?user=DuiyaQoAAAAJ&hl=en). A full list is also available in my [CV](../CV_redouane.pdf).

## Most Cited Papers

<div style="margin-top: 1.5rem;">

<div style="border-left: 4px solid #ac4142; padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: #fafafa;">
<p style="margin: 0 0 0.25rem 0;"><strong>The Analog Data Assimilation</strong></p>
<p style="margin: 0 0 0.25rem 0; color: #555;">Redouane Lguensat, Pierre Tandeo, Pierre Ailliot, Manuel Pulido, Ronan Fablet</p>
<p style="margin: 0 0 0.25rem 0; color: #555;"><em>Monthly Weather Review</em>, 2017, vol. 145, no. 10, pp. 4093–4107</p>
<a href="http://journals.ametsoc.org/doi/abs/10.1175/MWR-D-16-0441.1">Journal</a>
</div>

<div style="border-left: 4px solid #ac4142; padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: #fafafa;">
<p style="margin: 0 0 0.25rem 0;"><strong>Bridging observations, theory and numerical simulation of the ocean using machine learning</strong></p>
<p style="margin: 0 0 0.25rem 0; color: #555;">Redouane Lguensat, Julien Le Sommer, Ronan Fablet, et al.</p>
<p style="margin: 0 0 0.25rem 0; color: #555;"><em>Environmental Research Letters</em>, 2021</p>
<a href="https://iopscience.iop.org/article/10.1088/1748-9326/ac0eb0">Journal</a>
</div>

<div style="border-left: 4px solid #ac4142; padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: #fafafa;">
<p style="margin: 0 0 0.25rem 0;"><strong>A Deep Framework for Eddy Detection and Tracking From Satellite Sea Surface Height Data</strong></p>
<p style="margin: 0 0 0.25rem 0; color: #555;">Xu Sun, Mengmeng Zhang, Jing Dong, Redouane Lguensat, Ying Yang, Xi Lu</p>
<p style="margin: 0 0 0.25rem 0; color: #555;"><em>IEEE Transactions on Geoscience and Remote Sensing</em>, 2020</p>
<a href="https://ieeexplore.ieee.org/abstract/document/9247537/">Journal</a>
</div>

<div style="border-left: 4px solid #ac4142; padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: #fafafa;">
<p style="margin: 0 0 0.25rem 0;"><strong>Revealing the impact of global heating on North Atlantic circulation using transparent machine learning</strong></p>
<p style="margin: 0 0 0.25rem 0; color: #555;">Maike Sonnewald, Redouane Lguensat</p>
<p style="margin: 0 0 0.25rem 0; color: #555;"><em>Journal of Advances in Modeling Earth Systems</em>, 2021, 13, e2021MS002496</p>
<a href="https://doi.org/10.1029/2021MS002496">Journal</a>
</div>

<div style="border-left: 4px solid #ac4142; padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: #fafafa;">
<p style="margin: 0 0 0.25rem 0;"><strong>Physical invariance in neural networks for subgrid-scale scalar flux modeling</strong></p>
<p style="margin: 0 0 0.25rem 0; color: #555;">Hugo Frezat, Guillaume Balarac, Julien Le Sommer, Ronan Fablet, Redouane Lguensat</p>
<p style="margin: 0 0 0.25rem 0; color: #555;"><em>Physical Review Fluids</em>, 2021</p>
<a href="https://journals.aps.org/prfluids/accepted/01078Sd5K491ea04a11c1c28bcd9368a92c3065d6">Journal</a> &nbsp;|&nbsp; <a href="https://github.com/hrkz/SubgridTransportNN">Code</a>
</div>

</div>

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
