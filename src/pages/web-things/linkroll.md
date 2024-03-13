---
title: "11ty Linkrolls"
description: "Putting together a good old-fashioned linkroll for the 11ty static site generator."
parent: "Web Things"
date: 2024-03-13 # Last updated
img_path: /img/web-things/
tags:
  - web-things
  - post
thumb: mm.png
eleventyExcludeFromCollections: true
---

One of the things I've always loved about blogs were the linkrolls... that candy trail to more and more interesting things scattered around the web. I love to see folks sharing the interesting things they find. Social media is built on that sort of sharing, but they've also commoditized it and gamified it beyond recognition, and there's no persistence to it, either. I wanted an old-fashioned linkroll for myself.

Surely, I thought, this must be a paved cowpath in the Eleventy world, so I asked on Mastodon:

<iframe src="https://mastodon.social/@tbaxter/112083281191909486/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.social/embed.js" async="async"></script>

And I learned that yes, it has been done (and done well), but *how* to do it is less clear. in particular [Nicolas Hoizey](https://nicolas-hoizey.com/) had a very nice version, and had [written up part of it](https://nicolas-hoizey.com/articles/2023/02/08/a-bookmarklet-to-create-a-new-link-content-markdown-on-github/). In the interest of completeness (and so I can remember how I did it), here are all the steps. I should also note that Nicolas' implementation is way, way more sophisticated and complex than mine. This is the cavedweller version. We're [digging for fire](https://www.youtube.com/watch?v=xekfBhiqfig) here.

### Prepare the bookmarklet
1. 
