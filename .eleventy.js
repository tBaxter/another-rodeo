// 11ty Plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Helper packages
const Image = require("@11ty/eleventy-img");
const slugify = require("slugify");
const glob = require('fast-glob');
const path = require('path');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const { DateTime } = require("luxon");




module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // TO-DO: Move these into shortcodes folder
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // adds ability to easily create figure/figcaption
  eleventyConfig.addAsyncShortcode("figure", async function (img_path, img_name, desc = "", classname = "") {
  // Remove leading slash so path.join works
  const cleanPath = img_path.replace(/^\/+/, "");

  // Source image file in your project
  const inputFile = path.join("src", cleanPath, img_name);

  // Generate optimized images
  const metadata = await Image(inputFile, {
    widths: [350, 700, 1000],
    formats: ["webp", "jpeg"],
    outputDir: path.join("public", cleanPath), // writes to public/img/bikes/handcycle/
    urlPath: "/" + cleanPath,                  // browser sees /img/bikes/handcycle/...
  });

  // HTML attributes
  const imageAttributes = {
    alt: desc,
    class: classname,
    loading: "lazy",
    decoding: "async",
  };

  // Generate <picture> HTML
  const imageHtml = Image.generateHTML(metadata, imageAttributes);

  // Wrap in <figure>
  return `<figure class="image ${classname}">
    ${imageHtml}
    <figcaption>${desc}</figcaption>
  </figure>`;
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

  // ISO date for machine-readable datetime attributes
  eleventyConfig.addFilter("dateIso", dateObj => {
    if (!dateObj) return null;
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISO();
  });

  // human-readable date (alias of prettyDate)
  eleventyConfig.addFilter("dateReadable", dateObj => {
    if (dateObj) {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("d LLLL yyyy");
    }
  });

  // excerpt filter for generating short previews
  eleventyConfig.addFilter("excerpt", (content) => {
    const excerptLength = 150;
    if (!content) return "";
    if (content.length <= excerptLength) return content;
    return content.substr(0, excerptLength) + '...';
  });

  // limit filter to limit arrays
  eleventyConfig.addFilter("limit", (array, limit) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
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
  eleventyConfig.addCollection("shopnotes", function (collectionApi) {
    return collectionApi.getFilteredByTags("shopnotes");
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
