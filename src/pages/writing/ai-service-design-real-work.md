---
title: "This is where it all breaks"
description: "AI, service design, and the real work ahead"
date: 2025-05-30
parent: 'Writing'
img_path: /img/writing/
thumb: retro_robot.jpeg
tags:
    - writing
    - post
    - engineering
    - ai
    - service design
---

Let’s skip past the philosophical debate — there’s been plenty of that already (including some here). Whether or not you *should*, you did: you bought into AI. You committed your teams to building AI-driven solutions, and you’re starting to ship them.

You are in it. Or rather, AI’s in it. And then things get complicated.  

Because, as usual, the hard part isn’t really the technology, or even integrating it.  

It’s the world around it.  

That’s not an AI problem. It’s a **service design** problem.

### Systems are like people: they're messy and they often don't make much sense. 

A lot of software up until now has been built on the dream of reducing human messiness down to a clean loop:  `human asks → software responds → happy human`.

But real systems rarely end up like that. They’re often more like:  
`human asks → website makes API call to CRM → help desk → someone in compliance → another tool → export to spreadsheet → escalated to manager → judgment call → back down from manager for data entry → backend system → another person copy/pasting → software pushes results to other systems → human gets an email days later`.

Yet somehow, in 2025, we seem to think we can reduce *that* to:  
`human asks → AI responds → happy human`.

The real world is full of handoffs, mismatched expectations, missing context, and partial automation duct-taped together so people just trying to do their jobs may actually succeed most of the time. More importantly, even when they're doing their best, those people are inconsistent and make mistakes — because they’re human. This is the mess that **service design** has always tried to make sense of. 

Service design isn’t just about the user journey on a screen. It’s about the whole system — who’s doing what, with what tools, at what point, and what happens when that handoff goes sideways.

It pays attention to the awkward stuff: the delays, the workarounds, the “I guess I’ll email someone” moments. The parts where two systems almost work together, but not quite.
That’s where services tend to break — not just what the user sees, or even what the engineers build, but in the in-between and the edges.

### What Changes When You Add AI?

Everything. And nothing.

AI doesn’t just drop into an existing step like a new library or subsystem behind a feature flag. It reshapes the dynamics of the whole system. That’s because AI is introduced to replace one of two things:

1. Predictable but limited **deterministic process**, like code, workflow, or rules
2. A **human** with judgment, context, and fallback instincts

In the first case, you lose the predictability and testability. In the second, you keep the all the human weirdness without the innate paths to fixes.

#### Example 1: AI in Customer Support

Let’s say you’ve got a chatbot handling support. It answers questions, escalates tough ones, runs 24/7.

But what happens when:
- It confidently gives the wrong refund policy?
- It tells a customer to do something that voids their account?
- It doesn’t escalate because the person didn’t phrase their problem the right way?

Now the human on the other end isn’t just annoyed — they’re angry. They’ve been misinformed, misunderstood, and made to feel powerless. The AI made the problem *worse*.

And what happens to the remaining members of your human support team? They’re now **cleaning up**, not just answering questions. They're managing emotional escalations. They're carrying the risk of an AI that doesn't know what it doesn’t know.

They are the last line of defense for a system failure.

#### Example 2: AI in Internal Tools

Let’s say you give a policy analyst a tool that uses AI to summarize regulatory comments from the public. Hundreds of thousands of them. Saves time, right?

But then:
* The summary misses a key legal objection raised by multiple stakeholders.
* It flattens nuance into something “neutral” but meaningless.
* It leaves key details out, but the analyst doesn’t know what got left out.

Now you’ve reduced transparency and increased risk. The AI didn’t just summarize — it reshaped the evidence base for policy. 

If the rest of the system wasn’t built to catch that, you don’t have a model problem. You’ve got a service design problem.

### Wait — Don’t Humans Make These Mistakes Too?

Yes. All the time.

They misread. They skip steps. They make bad calls under pressure. But at the same time...

**1. Humans don’t make mistakes at AI scale.** An AI can repeat the same bad output hundreds of times in seconds. A person can’t.

**2. You can train (or fire) humans.** There’s a feedback loop. With AI, that loop is harder to build and slower to act on.

So no, the bar isn’t “perfect accuracy.”  If AI performs roughly as well as a human — and you can **catch its mistakes** — you're no worse off than you were before, and you may be much better off. That's good!

### Design for the Drop, Not Just the Lift

This is the part we skip too often. We talk about what AI *adds* — the “lift.”

But every time you add AI, you’re also **removing** something:  
- Human context  
- Transparent decisions  
- Known error types  

That’s the “drop.”

If you only design for the lift — and ignore the drop — you’re building something brittle.

Designing for the drop means asking:
- What context did this rely on before?
- Can the AI replicate it?
- What happens when it gets it wrong?
- Who notices?
- Who can recover?
- Are downstream humans ready — and do they have enough info to fix it?

If your service falls apart silently when the AI outputs garbage, then the service isn't well designed, is it?


### AI Makes Service Design More Important — Not Less

If you’re introducing AI, you’re taking on more responsibility:
- To define the seams
- To build guardrails
- To enable recovery
- To preserve accountability

That’s not a better prompt. It’s not a fine-tune. It’s not tweaking your retrieval chain.

It’s designing a system where people — not just models — can succeed.


### One More Thing

The worst failures won’t look like outages. They’ll look like slow erosion:
- Trust lost without a clear breach
- Bad decisions built on subtle misfires
- Teams overwhelmed cleaning up silent messes

If you’re not designing the **whole service** — inputs, AI, outputs, context, escalation, recovery — you’re not designing a system.

You’re just crossing your fingers.

Hope isn’t a strategy.

Service design is.
