---
title: "Building DSCovery"
description: "How I built DSCovery, the civic tech jobs aggregator, and lessons learned."
date: 2024-11-18
parent: 'Web Things'
tags:
  - dscovery
  - government
  - civic-tech
  - web-things
  - post
img_path: /img/web-things/
thumb: dirigible.jpeg
---

I was asked today how I built [DSCovery](https://dscovery.fly.dev), the aggregator I put together awhile back to help people find jobs in civic tech.

I wish it was a better story. 

The reality is that on a technical level it's a not-very complex Django app. I just _love_ Django for this sort of thing. You can get from zero to something in no time at all. Rails has the same advantages, but I know Django much better, and the Django admin made my life a lot easier in this case. It was kind of the killer feature for this project.

But, to back up a bit, aside from Django I already had experience with two things that would be key to DSCovery:

- I had used BeautifulSoup to scrape sites for various reasons, like hitting the Secretary of State site for election night returns back in my journalism days. I wasn't at the Lawrence Journal-World, but [James' Bennett's classic rundown of what that usually looks like seems pretty universal](https://www.b-list.org/weblog/2010/nov/02/news-done-broke/).
- I had spent enough time with various ATSs that I knew what their output tended to look like. For those who don't know, an ATS is an Applicant Tracking System -- The thing recruiting uses to keep track of open roles and who's applying for them.

Because I'd spent so much time with ATSs as a hiring manager, I knew there weren't _that_ many of them out there, and most folks congregated around just a few. Which meant that if I wrote the importer for one, I'd written it for all of them.

So I started going down the list of DSC firms using the most common platforms and started building an importer for each platform, as simple as possible:
1. For each company known to use this ATS platform....
2. Use the Requests library to get the HTML from the jobs page
3. Use BeautifulSoup to parse the jobs out
4. Tuck them away in a python data structure.

This got easier as I added more companies, because more often than not I could re-use an importer I'd already written. When I was fairly happy with the first importers, I built a view to wrap them and do a few things:
- Clean up old and/or unreachable jobs to keep things fresh
-  Set up the data structures for the importers
-  Pull in each of the importers as a module and runs them. 
- Take the data structure, do any last-minute cleaning, and write the new records to the database.

From the Django admin I can then keep an eye on the roles, assign them to different practices, set things as featured etc.

And really, that's about it. There are a few basic display views, but not a whole lot more. I've got some more things I'd like to do when I find time, but right now it's still pretty simple.

I recall doing some almost-interesting things with includes in the templates to make them more reusable, and to allow me to more easily use Alpine.js and/or HTMX, but if I'm being honest I can't recall now what it was that I was doing with Alpine.js or HTMX, and I'm not sure if I ever implemented it publicly.

### The challenges

There were a few challenges along the way, to be sure, and some of them have persisted.

For example, some of the ATSs are really difficult to parse, usually because they use client-side rendering (side note to ATS vendors: a jobs page is nearly the last place client-side rendering makes any sense). This borks BeautifulSoup because it sees the page as it was delivered from the server, not as it's hydrated client-side. Or, in other words, it sees an empty page.

In some of those cases I've been able to find the raw JSON it's hydrating the page from. In those cases I sidestep BeautifulSoup, grab the JSON and parse that. But in other cases the JSON is also unavailable and I'm stuck. Workable, for example, just seems unparseable, so I can't yet import jobs from Blue Tiger, Friends from the City, or Pixel Creative. That bums me out. They're good folks.

And some ATS are just completely stupid and awful to work with. Usually, but not always, these are old-school "enterprise" offerings that feature lousy markup and horrific user interfaces: ADP, ApplicantPro, UKG, that sort of thing. I really feel for the companies saddled with these systems. 

In some cases (like, Ad Hoc, for example) I think the company is important enough that I really want to include them, but their ATS system is so incredibly bad that it's just impossible. All I can do is pull from LinkedIn. It's not ideal. To all the DSC companies (and anyone else who'll listen) listen to this advice: Don't listen to fools trying to sell you these "enterprise" ATSs. They are garbage, and the person trying to convince you to switch to them should not be listened to.

There are also some cases where the ATS is too niche, or the companies are so small, that I'm waiting for some more jobs to import before going through the effort of writing a new importer.

At any rate, I continue to iterate, add more firms, and more functionality.

 The whole thing is hanging together pretty well so far, which makes me happy. It'd been awhile since I'd coded up much of anything, really, so I was glad to see I could still do it.

If you'd like to read more about DSCovery and _why_ I built it, [I wrote that up awhile back](http://localhost:8080/dscovery/). If you'd like to take a look under the hood, [all the code is public](https://github.com/tBaxter/DSCovery).

---------

_Photograph is of a Side Corridor on a Dirigible, ca. 1933, [from the National Archives](https://www.flickr.com/photos/usnationalarchives/7951499644/in/photostream/)_