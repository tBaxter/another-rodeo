---
title: "Not funny, Dad"
description: 'The end result of a fascination with obscure government data sources and dad jokes.'
date: 2024-01-27
parent: 'Web Things'
---

## [dadjoke.fly.dev](https://dadjoke.fly.dev)

About every other year or so I'm reminded that the U.S. Federal government has a site called Fatherhood.gov, and tucked away inside that tiny little backwater in the vast sea of government web sites there is a collection of dad jokes. Yes, the United States government keeps and hosts a collection of dad jokes, and because they are the work the US government, they are owned by and open to the public.

How this came to be is a fascinating story. Fatherhood.gov was established as part of the National Responsible Fatherhood Clearinghouse (NRFC), which came to be through the Deficit Reduction Act of 2005. 

For those who don't recall, in the mid-2000s there was a highly partisan (and arguably racially coded) panic over "responsible fatherhood" during the Bush/Cheney administration. When the DRA was rammed through Congress on a party-line vote, it authorized funds for "the development, promotion, and distribution of a media campaign to encourage the appropriate involvement of parents in the life of any child and specifically the issue of responsible fatherhood."

At some point, someone involved was smart enough to realize that all responsible fathers need a sizeable stable of dad jokes at the ready, and they were ready with a supply. And once they went into the site's CMS, providing a feed of them was trivial.

What's extraordinary is that some buzzkill bureaucrat hasn't come along and squashed it all. It's a beautiful thing when you think about it.

At any rate, inspired by this delightful bit of government arcana, I threw together a quick mashup putting the jokes together with a selection of dad-like images from Unsplash. You can see it at [dadjoke.fly.dev](https://dadjoke.fly.dev) -- at least until I move it to a more proper domain.

Originally, I had planned to pair the jokes with photos from other government resources such as the National Archives, Library of Congress or Smithsonian, but despite of my best efforts and their robust APIs I was not able to locate a suitable feed of dad photos. If anyone knows where to find them, let me know, OK?

The site itself is painfully simple. It's just a simple Flask site that tries to get a joke from fatherhood.gov (or icanhazdadjoke.com as a backup) pairs it with an image from unsplash, applies a short cache to it, and... well that's about it. There's just not much to it. Enjoy it as intended: as a silly little diversion.

### Why did I do it?

Because I could and I wanted to. That's about it. There are better places to get Dad jokes, if that's your thing.

### What did I learn?

Not a whole lot on such a simple site, but...

- I learned about Flask's built-in caching, which I hadn't used before.
- Learned a lot more about Library of Congress, Smithsonian and National Archives APIs, in spite of ultimately not using them.

### Where is it?
- [The site](https://dadjoke.fly.dev)
- [The repo](https://github.com/tBaxter/dad-joke)
