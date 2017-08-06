---
layout: page
title: My blogs
---
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> &nbsp; {{ post.date | date: "%b %Y" }}   </li>
      {{ post.excerpt }}
      <!-- <info datetime="{{ page.date | date: "%Y-%m-%d" }}"> -->

      <!-- </info> -->

  {% endfor %}
</ul>
