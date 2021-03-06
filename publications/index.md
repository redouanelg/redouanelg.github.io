---
layout: page
title: Selected Publications
permalink: /publications/
---

You'd better take a look at my [Google Scholar profile](https://scholar.google.fr/citations?user=DuiyaQoAAAAJ&hl=fr)! this page can be outdated
<br><br>
The complete list of publications can be found in my CV

# Submitted/Working on..

updating..

# Most cited journal papers

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/analog.png" width="350" height="200"> Redouane Lguensat, Pierre Tandeo, Pierre Ailliot, Manuel Pulido and Ronan Fablet. **The Analog Data Assimilation**. Monthly Weather Review, 2017, vol. 145, no 10, p. 4093-4107. [journal webpage](http://journals.ametsoc.org/doi/abs/10.1175/MWR-D-16-0441.1){:target="_blank"}

<br><br>

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/slainterp.png" width="350" height="200"> Redouane Lguensat, Phi Huynh Viet, Miao Sun, Ge Chen, Tian Fenglin, Bertrand Chapron, Ronan Fablet 
**Data-driven Interpolation of Sea Level Anomalies using Analog Data Assimilations**. Remote Sensing, 2019. [pdf](https://hal.archives-ouvertes.fr/hal-01609851){:target="_blank"}

<br><br>

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/ieeeTCI.png" width="350" height="200"> Ronan Fablet, Phi Huynh Viet, and Redouane Lguensat. (2017) **Data-Driven Models for the Spatio-Temporal Interpolation of Satellite-Derived SST Fields**. IEEE Transactions on Computational Imaging 3:4, 647-657. [journal webpage](http://ieeexplore.ieee.org/document/8025578/){:target="_blank"}, [pdf](https://www.researchgate.net/publication/319474901_Data-driven_Models_for_the_Spatio-Temporal_Interpolation_of_satellite-derived_SST_Fields){:target="_blank"}

<br><br>

# Selected conference papers

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/QGNET.png" width="350" height="200"> Redouane Lguensat, Julien Le Sommer, Ronan Fablet, Sammy Metref, Emmanuel Cosme. **Learning Generalized
Quasi-Geostrophic Models Using Deep Neural Numerical Models** Machine Learning and
the Physical Sciences workshop, NeurIPS 2019. Vancouver, Canada. [Arxiv](https://arxiv.org/abs/1911.08856){:target="_blank"}, [code](https://github.com/redouanelg/qgsw-DI/tree/master/QGNET){:target="_blank"}

<br><br>

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/eddynet.jpeg" width="350" height="200"> Redouane Lguensat, Miao Sun, Ronan Fablet, Evan Mason, Pierre Tandeo, Ge Chen. **EddyNet: A Deep Neural Network For Pixel-Wise Classification of Oceanic Eddies**. IEEE Geoscience and Remote Sensing Symposium (IGARSS) 2018, Valencia, Spain. [IEEExplore link](https://ieeexplore.ieee.org/document/8518411){:target="_blank"}. [pdf](https://arxiv.org/abs/1711.03954){:target="_blank"}

<br><br>

<img align="left" src="https://raw.githubusercontent.com/redouanelg/redouanelg.github.io/master/images/publicationimages/oceans2016.PNG" width="350" height="80">  Redouane Lguensat, Pierre Tandeo, Pierre Ailliot, Ronan Fablet, Bertrand Chapron
**Using archived datasets for missing data interpolation in ocean remote sensing observation series**. OCEANS 2016 - Shanghai : MTS/IEEE international conference, IEEE/MTS, 10-13 april 2016, Shanghai, China, 2016, pp. 1-6. [IEEExplore link](http://ieeexplore.ieee.org/document/7485433/){:target="_blank"}, [pdf](https://portail.telecom-bretagne.eu/publi/public/fic_download.jsp?id=65287){:target="_blank"}


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
