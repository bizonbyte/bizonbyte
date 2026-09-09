---
title: "Scaling with Low-Code: Where Dutch Companies Stumble"
date: "2026-05-05"
author: "Bizonbyte Team"
---

![A glass greenhouse structure with mature plants pressing against every pane, some cracking under the weight — morning light casting long shadows across overgrown pathways, suggesting beautiful growth that has exceeded its container](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-1-a-glass-greenhouse-structure-with-mature-plan.png)

The question Dutch companies keep asking is the wrong one. “Can low-code scale?” implies that scaling is mainly a technical limitation — that somewhere around ten thousand users or a hundred integrations, the platform simply falls over. This framing sends teams hunting for benchmark comparisons and vendor promises about throughput.

The actual failure mode is different. Low-code scales technically just fine. What breaks is governance, architectural coherence, and the ability to change direction. Dutch companies do not stumble because they hit a ceiling; they stumble because they manoeuvre themselves into corners they cannot get out of.

## The governance debt nobody budgets for

Most organisations adopt low-code to speed up delivery. The pitch works: citizen developers deliver internal tools in weeks, IT backlogs shrink, and business units feel autonomous. The first year looks like a pure win.

By the third year, the picture changes. A medium-sized logistics company in Rotterdam may have built forty Mendix applications across twelve different teams. Some follow naming conventions. Some have documentation. Most have neither. The original builders have moved on, and nobody can say with confidence which apps touch customer data, which connect to the ERP, or which would break if the identity provider changed.

This is not a platform problem. [Mendix](https://www.mendix.com/), [OutSystems](https://www.outsystems.com/), and [Microsoft Power Platform](https://powerplatform.microsoft.com/) all provide governance tooling. The problem is that organisations treat governance as optional overhead instead of scalable infrastructure. They budget for development speed, but not for the register, review process, or architectural standards that keep a growing portfolio coherent.

The stumble happens when someone eventually has to audit, refactor, or integrate that portfolio. The cost of understanding what exists exceeds the cost of rebuilding it. At that point, the original time saving evaporates.

## Architectural drift happens faster than you think

Traditional development has a natural brake on architectural chaos: friction. Writing custom code takes time, requires reviews, and forces infrastructure decisions. That friction creates opportunities for someone to ask whether a new service actually belongs in the architecture.

Low-code deliberately removes that friction. A business analyst can create a new application in an afternoon. That is the feature, not the bug. But it also means architectural drift accelerates proportionally.

![An aerial view of a Dutch polder landscape where water channels have been extended haphazardly — some running parallel, some crossing, some dead-ending — with small pumping stations scattered without apparent coordination](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-2-an-aerial-view-of-a-dutch-polder-landscape-wh.png)

An Amsterdam financial services provider discovered this after three years of enthusiastic Power Platform adoption. They had built eighty-seven Power Apps, each individually sensible — with none of the [adoption governance](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/methodology) that is supposed to come first and each solving a real problem. But the apps had developed different conventions for user identity, different data-storage patterns, and different assumptions about API contracts. Connecting them into coherent workflows required a translation layer more complex than the original applications.

The lesson is not that low-code creates bad architecture. The lesson is that low-code requires architectural discipline earlier and more explicitly than traditional development. The platform will not impose that discipline for you.

## The vendor lock-in question is real, but misunderstood

Dutch companies often name vendor lock-in as their biggest concern when scaling low-code — a concern the [EU Data Act](https://digital-strategy.ec.europa.eu/en/policies/data-act) partly addresses and partly does not. The concern is legitimate, but it is usually expressed too vaguely to be useful.

Lock-in exists on a spectrum. At one end, your visual logic and UI components are proprietary and cannot be extracted. At the other, your data is in standard formats, your integrations use documented APIs, and changing platforms means rebuilding interfaces rather than recovering information.

The practical question is not whether you are locked in, but whether you are locked in at a level you can tolerate. A workflow automation tool that captures your business logic is different from a tool that captures your button styling. Most organisations can live with the second; few should accept the first.

The stumbling block appears when companies treat all lock-in as equivalent and either avoid low-code entirely or adopt it without investigating what would specifically be difficult to change. The productive middle ground requires knowing where your data lives, how it can be extracted, and which business logic exists only as platform-specific visual configuration.

## What successful scaling actually requires

Companies that scale low-code successfully share a few characteristics. They establish platform governance from day one, not as a recovery project in year three. They assign architectural ownership — someone whose job is to say no to applications that violate integration standards. They treat low-code as a delivery mechanism, not as a replacement for technical judgement.

That means investing in capabilities that feel like overhead during the enthusiastic early phase: application registers, code-review processes adapted for visual development, integration standards that define how new applications connect to core systems, and documentation requirements that survive staff turnover.

None of this is exotic. It is the same operational maturity that makes traditional development sustainable at scale. The difference is timing: low-code lets you postpone the investment for longer while accumulating debt faster.

## The question you should ask instead

“Can low-code scale?” is the wrong question because it accepts a frame in which scaling is something that happens to you. The useful question is: “Are we building the operational capacity to scale this deliberately?”

![A control room with multiple monitoring screens showing different applications — some screens green and organised, others amber with warning indicators, one showing a dependency map that has become an incomprehensible tangle](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-3-a-control-room-with-multiple-monitoring-scree.png)

Dutch companies stumble when they treat low-code as a way to avoid building that capacity instead of as another surface on which to practise it. The platform is happy to let you build a hundred applications without governance, architectural standards, or documentation. It will not stop you. It will only make the eventual correction more expensive.

The successful organisations recognise this early. They spend the first months defining constraints that feel unnecessary when the portfolio is small. They accept that low-code speeds up delivery of individual applications, but not the maturity required to manage a portfolio of applications.

If your organisation is approaching a scaling point — or trying to recover from one — the starting point is not a platform evaluation. It is an honest assessment of whether you have built the operational infrastructure that scaling requires. The platform is not the limitation. Your willingness to manage it is.

---

<video controls autoplay muted loop playsinline style="max-width: 100%; height: auto;">
  <source src="/blog/meme_f667b265_f669e1.mp4" type="video/mp4" />
  Your browser does not support this video.
</video>

_Dutch companies scale with low-code and pretend everything is under control._
