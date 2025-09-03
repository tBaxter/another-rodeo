// 11ty Plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Helper packages
const slugify = require("slugify");
const glob = require('fast-glob');
const path = require('path');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const { DateTime } = require("luxon");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // TO-DO: Move these into shortcodes folder
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // adds ability to easily create figure/figcaption
  eleventyConfig.addShortcode("figure", function (img_path, url, desc, classname="") {
    return `<figure class="image ${classname}">
      <img src="${ img_path }${ url }" alt="${ desc }" />
      <figcaption>${ desc }</figcaption>
    </figure>`
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  glob.sync(path.join(__dirname, '_11ty/shortcodes/*.js')).forEach((file) => {
    let shortcodes = require('./' + file);
    Object.keys(shortcodes).forEach((name) => {
      eleventyConfig.addNunjucksShortcode(name, shortcodes[name]);
    });
  });

  // prettifier for dates
  eleventyConfig.addFilter("prettyDate", dateObj => {
    if (dateObj) {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("d LLLL yyyy");
    }
  });
 
  //--------------------------------------------------
  // Collections
  //--------------------------------------------------
  // Creates a list of parents suitable for nav from 
  // pages with "parent" in the front matter.
  // Also creates a slug for easy linking
  eleventyConfig.addCollection("parents", function (collection) {
    let parents = [];
    collection.getAll().forEach(function (item) {
      if ("parent" in item.data) {
        let p = item.data.parent;
        let slug = slugify(p.toLowerCase().replace("'","-"))
        // Quick check to see if the parent already exists.
        // the list of parents should be small, so this should be reasonably performant.
        pObj = parents.find(obj => obj.slug == slug);
        if (pObj) {
          pObj.posts.push(item)
        } else {
          // the item is not yet represented in the list of parents, so we'll create it.
          parents.push({
            name: p,
            slug: slug,
            posts: [item]
          });
        }
      }
    });
    return parents;
  });

  eleventyConfig.addCollection("writing", function (collectionApi) {
    return collectionApi.getFilteredByTags("writing");
  });
  eleventyConfig.addCollection("links", function (collectionApi) {
    return collectionApi.getFilteredByTags("link").reverse().slice(0, 15);
  });
  eleventyConfig.addCollection("recent", function (collectionApi) {
    return collectionApi.getFilteredByTags("post").reverse().slice(0, 3);
  });
  eleventyConfig.addCollection("older", function (collectionApi) {
    return collectionApi.getFilteredByTags("post").reverse().slice(3);
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      class: "tdbc-anchor",
      space: false,
    }),
    level: [1, 2, 3],
    slugify: (str) =>
      slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
      }),
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
    },
  };
};
