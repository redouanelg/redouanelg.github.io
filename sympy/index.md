---
title: Content
layout: default_sympySideBar
categories: sympyTutorial
key: 0 
---

## Essential Sympy tutorial for a multivariable calculus course


<ul>
{% assign sympyPages = site.pages | sort: 'key' %}
{% for link in sympyPages %}

{% if link.categories contains "sympyTutorial"%}

{% if link.key == 0 %}
	 <!-- do nothing -->
{% else %}
 <li>  <a href="{{ link.url }}">{{ link.title}}</a> </li>
{% endif %}



{% endif %}
	    
{% endfor %}



 

