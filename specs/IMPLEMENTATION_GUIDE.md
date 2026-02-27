# Adding Shop Notes to Another Rodeo

## Overview
This guide will help you add a new "Shop Notes" content type to your 11ty site. Shop Notes are lightweight, informal posts about small projects and tinkering that don't fit into your main project categories.

## Files to Create

### 1. Create Shop Notes Directory
**Location:** `src/shop-notes/`
**Action:** Create this new directory for shop notes content

### 2. Create Shop Notes Collection Data File
**Location:** `src/shop-notes/shop-notes.json`
```json
{
  "layout": "shop-note",
  "tags": "shopnotes",
  "permalink": "/shop-notes/{{ page.fileSlug }}/",
  "eleventyComputed": {
    "eleventyNavigation": {
      "key": "{{ title }}",
      "parent": "Shop Notes"
    }
  }
}
```

### 3. Create Shop Note Layout Template
**Location:** `src/_includes/shop-note.njk`

```njk
---
layout: base
---

<article class="shop-note-single">
  <header class="shop-note-header">
    <h1>{{ title }}</h1>
    <div class="meta">
      <time datetime="{{ page.date | dateIso }}">{{ page.date | dateReadable }}</time>
    </div>
  </header>

  {% if image %}
  <div class="shop-note-image">
    <img src="{{ image }}" alt="{{ title }}">
  </div>
  {% endif %}

  <div class="shop-note-content">
    {{ content | safe }}
  </div>

  {% if link %}
  <p class="external-link">
    <a href="{{ link }}">{{ linkText | default("View related link") }} →</a>
  </p>
  {% endif %}

  <nav class="post-nav">
    <a href="/shop-notes/">← All Shop Notes</a>
  </nav>
</article>
```

### 4. Create Shop Notes Index Page
**Location:** `src/shop-notes/index.njk`

```njk
---
title: Shop Notes
layout: page
permalink: /shop-notes/
eleventyNavigation:
  key: Shop Notes
  order: 5
---

<div class="intro">
  <p>Quick notes from the workbench. Small projects, experiments, and tinkering that don't warrant a full write-up but are worth remembering.</p>
</div>

<div class="shop-notes-list">
  {% set shopNotesList = collections.shopnotes | reverse %}
  {% for note in shopNotesList %}
  <article class="shop-note-entry">
    {% if note.data.image %}
    <img class="shop-note-thumb" src="{{ note.data.image }}" alt="{{ note.data.title }}">
    {% endif %}
    
    <div class="shop-note-body">
      <h3><a href="{{ note.url }}">{{ note.data.title }}</a></h3>
      <div class="shop-note-date">{{ note.date | dateReadable }}</div>
      
      {% if note.data.summary %}
      <p>{{ note.data.summary }}</p>
      {% else %}
      {{ note.templateContent | excerpt | safe }}
      {% endif %}
      
      {% if note.data.link %}
      <a href="{{ note.data.link }}" class="external">{{ note.data.linkText | default("Related link") }}</a>
      {% endif %}
    </div>
  </article>
  {% endfor %}
</div>
```

### 5. Add Shop Notes Module to Homepage
**Location:** `src/index.njk`

Find where your main project grid ends (after the first 3 project cards), and add this module:

```njk
{# Shop Notes Module - Add this after first project cards, before "Older Rodeos" #}
<section class="shop-notes-module">
  <h2>
    Shop Notes
    <a href="/shop-notes/">See all →</a>
  </h2>
  
  {% set recentShopNotes = collections.shopnotes | reverse | limit(4) %}
  {% for note in recentShopNotes %}
  <article class="shop-note-item">
    {% if note.data.image %}
    <img class="shop-note-thumb" src="{{ note.data.image }}" alt="{{ note.data.title }}">
    {% endif %}
    
    <div class="shop-note-content">
      <h4><a href="{{ note.url }}">{{ note.data.title }}</a></h4>
      
      {% if note.data.summary %}
      <p>{{ note.data.summary }}</p>
      {% else %}
      <p>{{ note.templateContent | excerpt | safe }}</p>
      {% endif %}
      
      <div class="shop-note-date">{{ note.date | dateReadable }}</div>
    </div>
  </article>
  {% endfor %}
</section>
```

### 6. Add Styles
**Location:** Add to your existing CSS file (or create `src/css/shop-notes.css` if you have a separate CSS directory)

```css
/* Shop Notes Module (homepage) */
.shop-notes-module {
  background: #f8f8f8;
  padding: 1.5rem;
  margin-bottom: 3rem;
  border-left: 3px solid #666;
}

.shop-notes-module h2 {
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shop-notes-module h2 a {
  font-size: 0.7em;
  font-weight: normal;
  color: #0066cc;
  text-decoration: none;
}

.shop-notes-module h2 a:hover {
  text-decoration: underline;
}

.shop-note-item {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.shop-note-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.shop-note-item .shop-note-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
}

.shop-note-item .shop-note-content {
  flex: 1;
}

.shop-note-item h4 {
  font-size: 1.1rem;
  margin-bottom: 0.35rem;
}

.shop-note-item h4 a {
  color: #333;
  text-decoration: none;
}

.shop-note-item h4 a:hover {
  color: #0066cc;
}

.shop-note-item p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.shop-note-item .shop-note-date {
  color: #999;
  font-size: 0.85rem;
}

/* Shop Notes Index Page */
.shop-notes-list {
  max-width: 700px;
}

.shop-note-entry {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  gap: 1.25rem;
}

.shop-note-entry:last-child {
  border-bottom: none;
}

.shop-note-entry .shop-note-thumb {
  width: 120px;
  height: 120px;
  object-fit: cover;
  flex-shrink: 0;
}

.shop-note-entry .shop-note-body {
  flex: 1;
}

.shop-note-entry h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.shop-note-entry h3 a {
  color: #333;
  text-decoration: none;
}

.shop-note-entry h3 a:hover {
  color: #0066cc;
}

.shop-note-entry .shop-note-date {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.625rem;
}

.shop-note-entry p {
  color: #666;
  margin-bottom: 0.5rem;
}

.shop-note-entry .external {
  color: #0066cc;
  font-size: 0.9rem;
}

/* Single Shop Note Page */
.shop-note-single {
  max-width: 700px;
}

.shop-note-single .shop-note-header {
  margin-bottom: 2rem;
}

.shop-note-single .shop-note-header h1 {
  margin-bottom: 0.5rem;
}

.shop-note-single .shop-note-header .meta {
  color: #999;
  font-size: 0.9rem;
}

.shop-note-single .shop-note-image {
  margin-bottom: 2rem;
}

.shop-note-single .shop-note-image img {
  width: 100%;
  height: auto;
}

.shop-note-single .shop-note-content {
  margin-bottom: 2rem;
}

.shop-note-single .external-link {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.shop-note-single .post-nav {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.shop-note-single .post-nav a {
  color: #0066cc;
  text-decoration: none;
}

.shop-note-single .post-nav a:hover {
  text-decoration: underline;
}

/* Intro section (used on index page) */
.intro {
  background: #f8f8f8;
  padding: 1.25rem;
  margin-bottom: 2.5rem;
  border-left: 3px solid #666;
}

.intro p {
  color: #666;
  margin: 0;
}
```

**Note:** If your site uses CSS custom properties (variables), you can replace the hardcoded colors with your existing variables. Look for existing usage of colors in your CSS and match those.

### 7. Add Navigation Item
**Location:** Update your navigation template (likely in `src/_includes/header.njk` or wherever nav is defined)

Add "Shop Notes" to your main navigation menu between "Writing" and any other links.

## Create Sample Shop Notes

Create these example files in `src/shop-notes/`:

### Example 1: `leather-glasses-case.md`
```markdown
---
title: "Leather glasses case with 3D printed skeleton"
date: 2026-02-12
image: /img/shop-notes/glasses-case.jpg
summary: "Printed a snap-together frame that gives the case structure while keeping it flexible. First time trying this hybrid approach."
---

Printed a snap-together frame that gives the case structure while keeping it flexible. First time trying this hybrid approach. The print took about 3 hours and used maybe 15g of filament. The leather is just some scrap I had lying around from another project.

Still figuring out the best way to attach leather to printed parts without it looking janky. This one uses contact cement and some careful wrapping.
```

### Example 2: `dopp-kit.md`
```markdown
---
title: "Made a leather dopp kit"
date: 2026-02-09
summary: "Trying out a new zipper technique. Rough around the edges but it works."
---

Trying out a new zipper technique. Rough around the edges but it works. Used a metal zipper which was harder to work with than I expected — the leather kept bunching up. Next time I'll baste it in place first instead of trying to just pin and sew.

The kit is bigger than I initially planned but that's probably fine. Better too big than too small for travel.
```

### Example 3: `4runner-sound-deadening.md`
```markdown
---
title: "Sound deadening in the 4Runner"
date: 2026-02-05
image: /img/shop-notes/dynamat.jpg
summary: "Spent the weekend pulling panels and laying down Dynamat. Road noise is way down. Should have done this years ago."
---

Spent the weekend pulling panels and laying down Dynamat. Road noise is way down. Should have done this years ago.

Did the doors, floor behind the front seats, and the rear cargo area. Skipped the roof for now because that's a much bigger job. The doors made the biggest difference — you can actually hear the stereo now at highway speeds.

Used about two boxes of Dynamat Xtreme. Pricey but worth it.
```

### Example 4: `console-divider.md`
```markdown
---
title: "3D printed center console divider for 4Runner"
date: 2026-02-01
image: /img/shop-notes/console-divider.jpg
link: "https://www.printables.com/model/example"
linkText: "Console Divider STL"
summary: "Stock console is a black hole. Designed a simple two-compartment insert."
---

Stock console is a black hole. Designed a simple two-compartment insert that sits in there and keeps things from sliding around. Nothing fancy — just measured the interior, modeled it in Fusion 360, and printed it in PETG so it can handle the heat.

Posted the STL on Printables if anyone else needs one.
```

## Configuration Updates

### Update `.eleventy.js`
Make sure you have the `excerpt` filter if it doesn't already exist. Add this function:

```js
// Add excerpt filter
eleventyConfig.addFilter("excerpt", (content) => {
  const excerptLength = 150;
  if (content.length <= excerptLength) return content;
  return content.substr(0, excerptLength) + '...';
});

// Add limit filter for limiting array length
eleventyConfig.addFilter("limit", (array, limit) => {
  return array.slice(0, limit);
});
```

## Testing

1. Create at least 2-3 sample shop notes in `src/shop-notes/`
2. Run `npm start` to build and serve locally
3. Check:
   - Homepage shows shop notes module with recent items
   - `/shop-notes/` index page displays all notes
   - Individual shop note pages render correctly
   - Navigation includes "Shop Notes" link

## Future Enhancements

Once the basic implementation is working, you might want to:

1. **Add tags to shop notes** for filtering by topic (leather, 3D printing, 4Runner, etc.)
2. **Create a shortcode** for related shop notes to appear on main project pages
3. **Add RSS feed** specifically for shop notes
4. **Implement search** across all shop notes

## Notes

- Shop notes without images will display text-only (this is by design)
- The `summary` field in frontmatter is optional - if omitted, an excerpt will be auto-generated
- The `link` field is optional and allows you to link to external resources (STL files, etc.)
- Date format should be YYYY-MM-DD in frontmatter
