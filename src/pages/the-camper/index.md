---
title: 'Fiberglass "egg" camper restoration'
eleventyNavigation:
  key: The Camper
---

  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for page in collections.camper | reverse -%}
      <li class="tdbc-card">
        {% if page.data.thumb %}<img class="thumb" src="{{ page.data.img_path }}{{ page.data.thumb }}" alt="" />{% endif %}
        <div class="tdbc-card__content">
          <a href="{{ page.url }}" class="tdbc-card__title">{{ page.data.title }}</a>
          <p>
            {{ page.data.description }}
          </p>

        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
