---
title: "Markitup (v2)"
description: 'Bringing an old favorite jQuery library into the modern era. And some musings on ChatGPT.'
date: 2024-02-08
parent: 'Web Things'
img_path: /img/web-things/
tags:
  - web-things
  - post
  - markitup
thumb: typewriter.jpeg
---

I've used a library called [MarkitUp](https://markitup.jaysalvat.com/home/) on different projects of mine for more than 15 years. Compared to most Rich Text Editors, I found it to be much lighter weight and gave users Just Enough help to format using markdown. On the server side, this also offered nice flexibilty: I could store markdown, HTML, or both. In short, for a lot of nerdy reasons I really liked MarkitUP.

But time marches on in a way that software rarely does, and as I've spun up a new project lately -- more on that to come -- I found that not only had Markitup not really kept up with times, I couldn't find anything comparable to replace it with, either.

In a nutshell, the world had left Markitup behind. It was built for jQuery, and in 2024 browsesrs have gotten a lot better and it's hard to see a reason to use jQuery anymore. It also was bloated with a lot of code to support browsers that just aren't really used anymore.

I decided I wanted to update it. This was a foolhardy spur of the moment decision, since I  don't entirely trust my modern javascript skills, either. Markitup isn't the only thing that's been left behind, I have, too. 

And then I thought, hey, what if I see if ChatGPT can convert it for me? And so I did. 

And it wasn't a perfect conversion, but it was pretty close. I still put in hours checking and testing, but even counting that time, it saved me hours. It was impressive.

------------------------------------

I've recognized for awhile now that I have been lucky -- the entire cohort of engineers who came up over the last 25 years have been lucky. Software engineering has been, for all of my career and all of recent memory, a highly paid, very expensive specialist field. 

This has been a historical fluke, and one the market will eventually correct. It always does. There's too much incentive to turn expensive specialities into commodities.

We are seeing the beginnings of the commoditization of software development. It had to happen. It is happening.

I don't think that's the end of the world for software developers, though. All of the best ones I've known have understood that the code is -- relatively speaking -- the easy part. The people you're building it for -- both the end users and the stakeholders  -- that's the hard part.

So while I may be impressed with ChatGPTs ability to convert jQuery code, I remain less impressed with it's problem solving ability, and that's the the real value of a good developer.

But anyways, about Markitup....


### Why did I do it?

Because I had a need, and because I thought it would be interesting to see how close generated code could get.

### What did I learn?

Generated code gets you about 80% there and you still need a human for the remainder. But that 80% may be the difference between a problem that gets solved and one that doesn't.


### Where is it?
- [The repo](https://github.com/tBaxter/markitup2)
