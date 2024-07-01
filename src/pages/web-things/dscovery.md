---
title: "DSCovery"
description: 'Building an aggregator for jobs in civic tech.'
date: 2024-07-01
parent: 'Web Things'
tags:
  - dscovery
  - government
  - civic-tech
  - web-things
  - post
img_path: /img/web-things/
thumb: dscovery.jpeg
---

Over the past 10 years or so there's been something of a revolution in Civic Technology, as a whole bunch of firms have popped up promising to do better than traditional government contractors, who have an appalling record when it comes to building anything that works at all, let alone delivering it on time.

The [Digital Services Coalition](https://digitalservicescoalition.org) followed closely behind, working to build a sense of community for this new breed of civic tech firms promise to bring modern engineering principles, agile methodology and human-centered practices to government. From an initial handful of companies involved, the DSC has grown to include nearly 50 companies.

For someone like myself, who likes working in the civic tech space and would like to continue to do so, this presents a problem: I'd like to keep track of job openings in the field, but I can't go check 50 jobs pages all the time. I'm privileged with a lot more time on my hands than a lot of folks, but ain't nobody got time for all that.

So I thought I should build the thing I wish to see in this world, and created [DSCovery](https://dscovery.fly.dev) to bring those job posts to me, and to anyone else who may be interested in them.

DSCovery is a not-particularly-complex Django/Python application that goes out to careers pages, retrieves new job posts from across the DSC organizationss and puts them all conveniently in one place. 

As of today (July 1) it collects jobs from the following companies:

1. 540
1. Ad Hoc
1. Agile Six
1. Analytica
1. Acquia
1. Archesys
1. AWL (All Women Leadership)
1. Bixal
1. Bloom Works
1. BlueLabs
1. Bracari
1. Capital Technology Group
1. Civic Actions
1. Clarity Innovations
1. Coforma
1. Corbalt
1. Exygy
1. Fearless
1. Metrostrar
1. MO Studio
1. Nava
1. Oddball
1. Pluribus Digital
1. Raft
1. Simple
1. Softrams
1. Skylight
1. Skyward
1. Truss
1. Verdance

I should note that any company's presence does not necessarily constitute an endorsement. I want to believe all the DSC firms are highly mission-driven and human-centered, but I also know there is a lot of variance in how different DSC firms approach the work. When interviewing, [you should still ask smart questions](https://another.rodeo/employer-questions/) to determine if any of these companies are the right fit for you.

There are also a lot of companies I'm not currently importing jobs from, and some of them are very good companies with fantastic people. In most cases, that's simply because they didn't have any openings and so I wasn't sure how to retrieve their posts. I'll be adding more of these to the mix over time, but for now, you won't find them:

- Blue Tiger
- Coa 
- Cognitive
- Element
- Flexion 
- Focus 
- For People
- Friends from the City
- Kind 
- Mediabarn
- Mobomo
- Simon 
- Snowbird
- Valiant Solutions
- Wheelhouse

### What's next?
One of the things I learned as I put this together is that there are some really great civic tech firms that have decided, for whatever reason, to not join the DSC. I'll be adding some of them, too, starting with more firms in the [Digital Women-Owned Small Business Alliance](https://www.digitalwosballiance.org), which has considerable overlap with the DSC.

I'm also planning on introducing some methods to filter results by practice, and perhaps some custom user-centered views. 

I'm also thinking about how I might pull in some job details, particularly salary info.

If you have thoughts on what you'd like to see, drop me a note in [the repo issues](https://github.com/tBaxter/dscovery/issues/).

### Why did I do it?

Because I wanted it to exist, thought it might help other people, and nobody else was doing it. Story of my life.

### What if something is broken?

Don't be surprised. This was a three-day project by a single person, and there will certainly be things that could be better. If you see something drop a note in [the repo issues](https://github.com/tBaxter/dscovery/issues/).

### Where is it?
- [The site](https://dscovery.fly.dev)
- [The repo](https://github.com/tBaxter/dscovery)
