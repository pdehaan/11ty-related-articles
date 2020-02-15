# 11ty-related-articles

Specifying related articles using template front-matter.

## HOW

You can specify related posts in your template front-matter using the arbitrarily named "related" key:

```njk
---
title: Post 1
tags:
  - tech
related:
  - post-2
---
```

Then, in your [layout file](src/_includes/layouts/blog.njk), we can check for that `related` key and loop over the array of related blog posts and filter them out of the `collections.blog` collection using a custom Nunjucks `featured()` filter:

```njk
{% if related %}
<aside>
  <h2>Related:</h2>
  <ul>
    {%- for post in collections.blog | featured(related) %}
    <li><a href="{{ post.data.page.url }}">{{ post.data.title }}</a></li>
    {%- endfor %}
  </ul>
</aside>
{% endif %}
```

Where our [custom `featured` filter](.eleventy.js) looks like the following:

```js
eleventyConfig.addFilter("featured", (collection = [], related = []) => {
  return collection.filter(page => related.includes(page.fileSlug));
});
```
