---
title: "11ty Linkrolls"
description: "How to build an old-fashioned linkroll for the 11ty static site generator."
parent: "Web Things"
date: 2024-03-13 # Last updated
img_path: /img/web-things/
tags:
  - web-things
  - post
thumb: chain.jpg
---

One of the things I've always loved about blogs were the linkrolls... that candy trail to more and more interesting things scattered around the web. I love to see folks sharing the interesting things they find. Social media is built on that sort of sharing, but they've also commoditized it and gamified it beyond recognition, and there's no persistence to it, either. I wanted an old-fashioned linkroll for myself.

Surely, I thought, this must be a paved cowpath in the Eleventy world, so I asked on Mastodon:

<iframe src="https://mastodon.social/@tbaxter/112083281191909486/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.social/embed.js" async="async"></script>

And I learned that yes, it has been done (and done well), but *how* to do it is less clear. in particular [Nicolas Hoizey](https://nicolas-hoizey.com/) had a very nice version, and had [written up part of it](https://nicolas-hoizey.com/articles/2023/02/08/a-bookmarklet-to-create-a-new-link-content-markdown-on-github/). In the interest of completeness (and so I can remember how I did it), here are all the steps. I should also note that Nicolas' implementation is way, way more sophisticated and complex than mine, and that his 11ty codebase is chock full of interesting things I'll probably emulate later. For now, for this linkroll, this is the cavedweller version. We're [digging for fire](https://www.youtube.com/watch?v=xekfBhiqfig) here.

### Prepare the bookmarklet
1. Install the [bookmarklet NPM package](https://www.npmjs.com/package/bookmarklet) with `npm install bookmarklet` or, if you're like me and you have some sort of NPM path issue you don't want to track down, shake your head and make it a global install: `npm install -g bookmarklet`
2. Following the link from Nicolas' site, I grabbed his [bookmarklet code](https://github.com/nhoizey/nicolas-hoizey.com/blob/main/assets/js/bookmarklets/new-link.js) and put it in the same location on my site: `/assets/js/bookmarklets/`
3. In the bookmarklet script, look for `newFileUrl` and change the Github address to your own. I also modified it to automatically prompt for tags after getting _really_ confused about why my pages didn't show up in any collections. You can see [my version in Github](https://github.com/tBaxter/another-rodeo/blob/main/assets/js/bookmarklets/new-link.js).
4. Build the bookmarklet with `bookmarklet --demo assets/js/bookmarklets/new-link.js src/tools/bookmarklets/new-link.html`. Note that the last half of that command is the destination. In my case, I had to create a directory or two before I could get the output file there.
5. Fire up your local site with `npm start` and navigate to `http://localhost:8080/tools/bookmarklets/new-link/`. You should see your bookmarklet and be able to drag it to your bookmarks bar.
6. This is a good time to test it. Navigate to any page and click the bookmarklet. You should see prompts for the page title and a slugified (URL-safe) version of the title. If you're using my version, you should also get a prompt for tags. Click "OK" through the prmpts and you _should_ get redirected to github, where you should see a draft of a new page. 

### Creating new entries for the linkroll
Whenever you click the bookmarklet it will create a new page in Github. At that point, you still need to save and commit the changes to create the new entry. I don't know if this part could be automated, and I didn't look into it because I thought it was a useful final step to ensure that the entry looked correct and an additional point to add any last-minute edits.

Anything in the page you create here should be available to your site downstream, so you very well may want to add additional information. By default it attempts to grab and excerpt from the page, but you can also add your own thoughts.

### Showing the entries
This is where things went sideways for me and the simple things got hard. I got pretty confused about why my new content didn't show up, and why I didn't have a "links" collection. 

It turned out that the original bookmarklet didn't add any tags -- I'm guessing Nicolas adds them himself -- and without them, the pages didn't appear in any collection and the collection wasn't created. Once I figured that out, things got simpler.

To create a links page, I pretty much copied what Nicolas had done for his archives, although in a pretty dumbed-down version.
1. I grabbed Nicolas' link index page and [made my own version](https://github.com/tBaxter/another-rodeo/blob/main/src/links/index.njk). 
2. That index page relies on the [linkcard macro](https://github.com/tBaxter/another-rodeo/blob/main/src/_includes/macros/linkCard.njk), which in turn relies on the [card](https://github.com/tBaxter/another-rodeo/blob/main/src/_includes/macros/card.njk) and [meta](https://github.com/tBaxter/another-rodeo/blob/main/src/_includes/macros/meta.njk) macros, all of which I grabbed from Nicolas and then stripped down. I admit macros are a part of 11ty I'm not familiar with, so it's very possible this part could be simpler and/or more elegant. 
3. Fire up the local version again, if it's not already running. You should see a page with the link you created earlier (although you may need to `git pull` to bring it down to your local build). If not, start debugging.

I also created a simple sidebar for my index page, which was considerably less involved:

{% raw %}
```
    <ul class="linkroll">
        {% for link in collections.links %}<li>
            <a href="{{ link.url }}">{{ link.data.title }}</a>
            {{ link.content | safe }}
        </li>{% endfor %}
    </ul> 
```
{% endraw %}

So, that's how I did it.

### My to-do list from here
1. Make saving a new entry trigger a Netlify build. Right now it doesn't appear to. I imagine there's a Github action or something to do it, I just haven't figured it out yet.
2. Possibly related to the above, or causing the entry to not show up on deployment, but I introduced a defect when adding multiple links. They're becoming a single string, so they don't get added to collection properly. I'll have to sort that out.
3. Think about how I might introduce images. Nicolas appears to use thumb.io to get screenshots. I'm wondering about leveraging `og:image` tags where they're found
4. Nicolas really does have a lot of interesting ideas in his repo, and I think I'm likely to incorporate more of them.
