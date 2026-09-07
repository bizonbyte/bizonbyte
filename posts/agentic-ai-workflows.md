---
title: "Agentic AI Workflows: een praktische gids voor 2026"
description: "Leer hoe agentic AI-workflows daadwerkelijk in productie werken, van kernconcepten en orchestration-patronen tot veiligheid, governance en integratie."
date: "2026-09-06"
author: "Bizonbyte Team"
---

![Agentic AI Workflows: een praktische gids voor 2026](/blog/agentic-ai-workflows-cover.png)

Agentic AI-workflows draaien al in productie, maar het ongemakkelijke deel is dat de meeste nog steeds falen om operationele redenen, niet vanwege de modellen. In 2026 vond een groot industrieel rapport dat **57% van de organisaties** al AI-agenten inzet voor **multi-stage workflows**, terwijl slechts **16%** **cross-functionele of end-to-end processen** had bereikt binnen teams of bedrijfsfuncties. Dat is een duidelijk signaal dat adoptie sneller gaat dan diepe integratie [The 2026 State of AI Agents Report](https://resources.anthropic.com/hubfs/The%202026%20State%20of%20AI%20Agents%20Report.pdf). Die kloof is waar pilot-enthousiasme botst met betrouwbaarheid, governance en legacy-systemen.

Een nuttige manier om over deze categorie na te denken is simpel: een agentic AI-workflow is geen chatbot met een langer antwoord. Het is een systeem dat kan **plannen**, **tools aanroepen**, **state bijhouden** en **doorgaan over meerdere stappen** totdat het een begrensde taak voltooit, of overdraagt wanneer het niet verder kan. Dat verschil is belangrijk, want zodra een AI mag handelen, erf je dezelfde technische vragen die je bij elk productiesysteem zou stellen: identiteit, rechten, retries, observeerbaarheid, rollback en verantwoording.

## Inhoudsopgave
- [Wat agentic AI-workflows in de praktijk betekenen](#wat-agentic-ai-workflows-in-de-praktijk-betekenen)
  - [De grens is het echte product](#de-grens-is-het-echte-product)
- [De bouwstenen van een agentic workflow](#de-bouwstenen-van-een-agentic-workflow)
  - [De agent-loop doet het directe werk](#de-agent-loop-doet-het-directe-werk)
  - [Tools, geheugen en orchestration doen het zware werk](#tools-geheugen-en-orchestration-doen-het-zware-werk)
- [Veelvoorkomende workflow-patronen en hun afwegingen](#veelvoorkomende-workflow-patronen-en-hun-afwegingen)
  - [Structuur moet de vorm van de taak volgen](#structuur-moet-de-vorm-van-de-taak-volgen)
- [Orchestration, evaluatie en toolgebruik](#orchestration-evaluatie-en-toolgebruik)
  - [Deterministische controle en modelkeuze moeten naast elkaar bestaan](#deterministische-controle-en-modelkeuze-moeten-naast-elkaar-bestaan)
  - [Evaluatie moet trajecten scoren, niet alleen antwoorden](#evaluatie-moet-trajecten-scoren-niet-alleen-antwoorden)
- [Veiligheid, governance en begrensde autoriteit](#veiligheid-governance-en-begrensde-autoriteit)
  - [Controles moeten worden afgedwongen in de runtime](#controles-moeten-worden-afgedwongen-in-de-runtime)
- [Waarom de meeste agentic workflows vastlopen vóór productie](#waarom-de-meeste-agentic-workflows-vastlopen-vóór-productie)
  - [Een productiegereedheidschecklist die er echt toe doet](#een-productiegereedheidschecklist-die-er-echt-toe-doet)
- [Agentic workflows integreren in bestaande systemen](#agentic-workflows-integreren-in-bestaande-systemen)
  - [Integratiecontracten moeten er vanaf dag één zijn](#integratiecontracten-moeten-er-vanaf-dag-één-zijn)
- [Vragen die technisch leiders stellen vóór de lancering](#vragen-die-technisch-leiders-stellen-vóór-de-lancering)

<a id="wat-agentic-ai-workflows-in-de-praktijk-betekenen"></a>
## Wat agentic AI-workflows in de praktijk betekenen

Een fintech-team lanceert een agent om uitzonderingen bij leningaanvragen te triagen. In staging ziet het er goed uit: de prompts zijn netjes, de toolcalls zijn gestructureerd en de eerste reviewers waarderen de snelheid. Maar op dag zes keurt de agent twee dossiers goed die volgens nalevingsregels geblokkeerd hadden moeten worden. Dat is het punt waarop het gesprek stopt over "kan het model redeneren?" en begint over **workflowgrenzen**, **tooltoegang** en **wat er gebeurt als de loop de verkeerde afslag neemt**.

Op praktijkniveau zijn **agentic AI-workflows** systemen waarin een LLM-gestuurde agent beslissingen neemt binnen een gedefinieerde grens, tools aanroept, het resultaat observeert en de volgende stap kiest. Ze verschillen van chatbots omdat chatbots antwoorden, terwijl agenten **handelen**. Ze verschillen ook van traditionele automatisering omdat vaste automatisering vooraf bepaalde vertakkingen volgt, terwijl een agent zijn pad kan aanpassen wanneer de input rommelig, onvolledig of dubbelzinnig is.

<a id="de-grens-is-het-echte-product"></a>
### De grens is het echte product

De nuttige vraag is niet of een agent een slim antwoord kan genereren. Het is of het systeem een taak kan voltooien met begrensde autonomie en kan herstellen wanneer er iets misgaat. Daarom hebben productiesystemen expliciete limieten nodig op **wat de agent mag aanraken**, **hoe ver het kan gaan** en **wanneer het moet stoppen en een mens moet vragen**.

> **Praktische regel:** als een workflow niet kan worden beschreven als een grens plus een reeks toegestane acties, is het niet klaar voor autonomie.

De rest van de stack volgt daaruit. Als de agent geen state kan bewaren over stappen heen, kan het geen multi-stage taak beheren. Als het geen tools veilig kan gebruiken, kan het niets echt doen. Als het niet netjes kan overdragen, wordt het een aansprakelijkheid in plaats van een operator. Agentic AI-workflows zijn krachtig juist omdat ze tussen statische automatisering en open autonomie zitten, maar dat middengebied werkt alleen wanneer het technische team de grens als een eersteklas ontwerpobject behandelt.

<a id="de-bouwstenen-van-een-agentic-workflow"></a>
## De bouwstenen van een agentic workflow

Denk aan één agent als een **junior analist met een laptop, een notitieblok, een archiefkast en een supervisor**. De laptop is de modelloop, het notitieblok is kortetermijn-werkgeheugen, de archiefkast is persistente state en de supervisor is orchestration. Als een van die onderdelen ontbreekt, vergeet de workflow wat het doet, handelt het blindelings of voltooit het nooit een taak netjes.

![Een diagram dat de bouwstenen van een agentic workflow illustreert, waaronder geheugen, orchestration, tools en een agent-loop.](https://cdnimg.co/0259b017-1989-49cd-be8b-bf38663476c4/9c17727d-76ad-4716-973e-7d04be3058df/agentic-ai-workflows-agentic-loop.jpg)

<a id="de-agent-loop-doet-het-directe-werk"></a>
### De agent-loop doet het directe werk

De kernloop is eenvoudig. De agent **neemt context waar**, **redeneert over de volgende stap**, **handelt via een tool** en **observeert het resultaat**. Die cyclus herhaalt zich totdat de taak is voltooid of de runtime het stopt. In een echte workflow doet het model zelden pure abstracte redenering; het beslist of het een database moet bevragen, een record moet ophalen, om verduidelijking moet vragen of moet escaleren.

<a id="tools-geheugen-en-orchestration-doen-het-zware-werk"></a>
### Tools, geheugen en orchestration doen het zware werk

De **toollaag** is alles wat de agent kan aanraken: API's, databases, code-interpreters, retrieveringssystemen of interne services. De **geheugenlaag** bewaart kortlevende kladruimte, taakgeschiedenis en eventuele persistente feiten die stappen moeten overleven. De **orchestratielaag** coördineert de loop, wat planning, stappenlimieten, retries en overdrachten inhoudt wanneer de workflow niet kan doorgaan.

Dit is belangrijk omdat het model zelf nooit het hele systeem is. Een workflow wordt pas betrouwbaar wanneer de runtime de actiereeks leesbaar en herstelbaar maakt. Daarom is de supervisor-analogie relevant. De supervisor doet het werk niet, maar definieert de route, volgt de voortgang en stopt de analist wanneer die buiten de scope dwaalt.

> Een workflow is slechts zo goed als de state die het bewaart en de acties die het veilig kan herhalen.

Samen vormen deze bouwstenen een compleet uitvoeringspatroon. Het model beslist, de tool voert uit, geheugen bewaart continuïteit en orchestration handhaaft beperkingen. Wanneer die stack schoon is, kan de agent multi-step werk aan zonder elk verzoek in een broos eenmalig script te veranderen.

<a id="veelvoorkomende-workflow-patronen-en-hun-afwegingen"></a>
## Veelvoorkomende workflow-patronen en hun afwegingen

Er is niet één juiste agentarchitectuur. De beste keuze hangt af van of het werk lineair, vertakkend, risicovol of luidruchtig is. Teams krijgen problemen wanneer ze elk probleem in hetzelfde patroon proberen te persen, vooral wanneer de kosten van een verkeerde stap hoog zijn.

| Patroon | Structuur | Veelvoorkomende faalmodi | Beste toepassing |
| --- | --- | --- | --- |
| Single-agent met toolgebruik | Eén agent beslist en roept tools direct aan | Overreach, verborgen loops, zwak herstel bij toolfouten | Smalle taken met duidelijke richtlijnen |
| Supervisor met sub-agents | Eén controller delegeert naar gespecialiseerde agents | Coördinatie-overhead, conflicterende outputs, trage escalatie | Taken met duidelijke specialismen |
| Sequentiële pipeline van agents | Output van de ene agent voedt de volgende | Foutpropagatie, broze overdrachten, moeilijk debuggen | Goed gedefinieerde multi-step processen |
| Parallelle fan-out met aggregatie | Meerdere agents werken parallel, resultaten worden samengevoegd | Inconsistente outputs, samenvoegingsdubbelzinnigheid, kosteninflatie | Onderzoeks-, vergelijkings- en beoordelingstaken |
| Iteratieve kritiek en revisie | Eén agent stelt op, een ander bekritiseert, daarna reviseert | Loopen zonder voortgang, subjectieve churn | Content- en analysetaken met reviewwaarde |

<a id="structuur-moet-de-vorm-van-de-taak-volgen"></a>
### Structuur moet de vorm van de taak volgen

Een single-agent setup is meestal het schoonste startpunt wanneer de workflow kort is en de actieset klein. Het wordt broos wanneer de agent te veel tools of te veel vrijheid heeft. Een supervisorpatroon helpt wanneer verschillende stappen verschillende expertise nodig hebben, maar de overdrachten kunnen moeilijker te debuggen zijn dan de oorspronkelijke taak wanneer eigendom niet duidelijk is.

Sequentiële pipelines werken goed wanneer elke fase onafhankelijk kan worden gevalideerd, maar één slechte fase kan de rest van de keten vergiftigen. Parallelle fan-out is nuttig wanneer je breedte nodig hebt, niet zekerheid, maar je betaalt voor die breedte in samenvoeglogica en latentie. Iteratieve kritiekloops kunnen de kwaliteit verbeteren, maar ze kunnen het systeem ook bezig houden zonder een sterker resultaat te produceren.

De praktische vuistregel is bot. Als de taak één dominant pad heeft, houd de agent dan eenvoudig. Als de taak meerdere geldige subpaden heeft, gebruik dan een supervisor of een pipeline. Als de workflow afhangt van vergelijking of synthese, doe dan aan fan-out. Als het doel kwaliteitscontrole is, voeg dan kritiek toe, maar begrens de loop zodat het niet blijft herschrijven.

<a id="orchestration-evaluatie-en-toolgebruik"></a>
## Orchestration, evaluatie en toolgebruik

Zodra een agentic workflow live is, wordt orchestration het controleplatform. Een planner kiest de volgende actie, een dispatcher stuurt de toolcall, een parser zet het resultaat om in gestructureerde state en een evaluator beslist of er verdergegaan, herhaald of overgedragen moet worden. Die controlekringloop kan deels deterministisch en deels modelgestuurd zijn; de sterkste productiesystemen combineren meestal beide.

![Een diagram dat het agentic AI-workflowproces illustreert van trigger tot eindoutput met verfijningsloops.](https://cdnimg.co/0259b017-1989-49cd-be8b-bf38663476c4/2efab775-c3d6-4469-9ac1-07997fe55577/agentic-ai-workflows-orchestration-process.jpg)

<a id="deterministische-controle-en-modelkeuze-moeten-naast-elkaar-bestaan"></a>
### Deterministische controle en modelkeuze moeten naast elkaar bestaan

Puur modelgestuurde orchestration is verleidelijk, maar het maakt fouten moeilijker reproduceerbaar. Deterministische structuren zoals DAG's, state machines en geschreven vertakkingen geven voorspelbare checkpoints. Modelgestuurde keuze is nog steeds nuttig binnen die grenzen, vooral wanneer de workflow op basis van context moet kiezen tussen tools, retry-paden of escalatiepaden.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/NtwkPm8lckw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Toolontwerp is net zo belangrijk. Elke gewrapte API moet een schema, een authenticatiegrens, time-outbudgetten en idempotent gedrag hebben waar retries mogelijk zijn. Als een tool dubbel kan schrijven of een side effect twee keer kan triggeren, heeft de agentruntime bescherming nodig voordat het model toegang krijgt.

<a id="evaluatie-moet-trajecten-scoren-niet-alleen-antwoorden"></a>
### Evaluatie moet trajecten scoren, niet alleen antwoorden

Pilots sterven meestal hier. Een workflow kan er goed uitzien als je alleen naar het eindantwoord kijkt, terwijl het daadwerkelijke actiespoor gebroken is. De **WORFBENCH**-benchmark toont waarom graph-aware evaluatie hier nuttiger is: het rapporteert **18.679 trainingsvoorbeelden**, **2.146 testvoorbeelden** en **723 vastgehouden taken**, en het scoort of een LLM uitvoerbare multi-step workflows met correcte vertakkingen en afhankelijkheidsstructuur kan genereren [WORFBENCH](https://arxiv.org/abs/2410.07869).

Dat is belangrijk omdat workflowfouten vaak structureel zijn: ontbrekende stappen, verkeerde volgorde of gebroken afhankelijkheden. Voor productiewerk zijn procedureniveau-metrics nuttiger dan vibes. Meet toolcall-nauwkeurigheid, stapefficiëntie en of het traject de bedoelde graph volgde. Voeg daarna uitkomstmetrics toe die verankerd zijn in bedrijfssignalen, want een technisch correct trace faalt nog steeds als het het echte gebruikersprobleem niet oplost.

Je kunt die discipline niet leveren zonder replay. Offline harnesses vangen regressies op voordat gebruikers ze zien, en shadow runs laten je kandidaatwijzigingen vergelijken met live verkeer zonder ze de leiding te geven. Als de orchestratielaag verandert en geen replayharness het opmerkt, is de evaluatielaag te ondiep.

**Aanbevolen leesvoer:** [The Multi LLM Stack](https://www.mory.dev/posts/the-multi-llm-stack/)

<a id="veiligheid-governance-en-begrensde-autoriteit"></a>
## Veiligheid, governance en begrensde autoriteit

Veiligheid is geen beleidsnotitie. Het is een architectuurbeslissing over hoeveel autoriteit een agent krijgt en onder welke beperkingen. Het schoonste principe is **begrensde autoriteit**: elke actie moet zijn gescopeerd naar een identiteit, een toegestane toolset, een budget en een blast radius.

Een beveiligingsanalyse uit 2026 meldde dat slechts **21%** van de organisaties een volledig actuele inventaris van agents, tools en verbindingen bijhoudt, terwijl **79%** geen formeel governancebeleid heeft voor AI-agents of MCP-verbindingen en **60%** in de afgelopen 12 maanden geen AI- of agentic-risicobeoordeling heeft uitgevoerd [Agentic AI security readiness is lagging enterprise adoption](https://nhimg.org/articles/agentic-ai-security-readiness-is-lagging-enterprise-adoption/). Dat is geen toolingkloof. Het is een controlekloof.

<a id="controles-moeten-worden-afgedwongen-in-de-runtime"></a>
### Controles moeten worden afgedwongen in de runtime

Gescoopte tokens met korte TTL's zorgen dat toegang niet langer blijft hangen dan de taak. Allowlisted tool-API's verkleinen het oppervlak dat de agent kan aanraken. Menselijke goedkeuringscheckpoints horen bij onomkeerbare acties, niet bij elke laagrisicostap, omdat buitensporige goedkeuring de workflow vernietigt. Sandboxed uitvoering helpt wanneer code of datatransformaties isolatie nodig hebben, en gestructureerde validators moeten malformed toolcalls afwijzen voordat ze downstream systemen bereiken.

Governance vereist meer dan toegangscontrole. Beslissingslogs, audittrails en policy-as-code geven teams een manier om te antwoorden wie wat deed, wanneer en onder welke rechten. Red-team evals moeten testen op promptinjectie, data-exfiltratie en weggelopen loops, want dat zijn de faalmodi die ertoe doen wanneer een agent continu mag handelen.

> Als een actie niet kan worden uitgelegd, gelogd en teruggedraaid, moet het niet autonoom zijn.

Observeerbaarheid sluit de cirkel. Trace elke stap, sample trajecten voor review en definieer kill switches die een misdragende workflow in seconden kunnen stoppen. Dat geeft engineering, security en operations één gedeelde kijk op het systeem, wat de enige manier is waarop begrensde autoriteit na de lancering echt blijft.

<a id="waarom-de-meeste-agentic-workflows-vastlopen-vóór-productie"></a>
## Waarom de meeste agentic workflows vastlopen vóór productie

De grootste fout is modelkwaliteit als belangrijkste blokkade behandelen. De transitie faalt meestal op de operationele laag. Een systematische review uit 2026 vond dat **minder dan 24%** van de pilotprogramma's succesvol operationeel werd, en het koppelde die mislukkingen aan betrouwbaarheid op lange horizon, multi-agent toezicht, benchmarkkwaliteit en veilige integratie met bestaande systemen [Systematic review on agentic AI deployments](https://ideas.repec.org/p/zbw/esprep/341499.html). Een pilot kan er in een smalle demo solide uitzien en toch breken zodra het binnen een echt bedrijf moet draaien.

Het patroon achter die stagnaties is bekend. Legacy-integraties zijn rommelig, eigendom is onduidelijk, observeerbaarheid is dun en niemand heeft gedefinieerd hoe "goed" eruitziet wanneer de agent een plausibele maar verkeerde beslissing neemt. De uitrol vertraagt omdat het operationele model vaag is, niet omdat het model onbruikbaar is.

![Een infographic met vier hoofdredenen waarom agentic AI-workflows falen bij de overgang naar een productieomgeving.](https://cdnimg.co/0259b017-1989-49cd-be8b-bf38663476c4/69a9fb10-720c-49b5-a9f3-72a8fad38318/agentic-ai-workflows-production-challenges.jpg)

<a id="een-productiegereedheidschecklist-die-er-echt-toe-doet"></a>
### Een productiegereedheidschecklist die er echt toe doet

- **Gedefinieerde use case:** De workflow heeft een meetbare uitkomst nodig, niet alleen een overtuigende demo.
- **Geïnstrumenteerde toollaag:** Elke call heeft traceerbaarheid nodig, want blinde agents debuggen is traag en duur.
- **Trajectevaluatie:** Bekijk het volledige actiepad, niet alleen de uiteindelijke tekst.
- **Gescoopte rechten:** De agent mag alleen aanraken wat het nodig heeft.
- **Audit en rollback:** Elke belangrijke actie heeft een log en een terugdraaipad nodig.
- **Benoemde eigenaar:** Iemand moet eigenaar zijn van kwaliteit, kosten en escalatie.

Een praktisch detail van technische teams waar ik mee heb gewerkt: de uitrol breekt meestal op de naden tussen de AI-laag en het bestaande systeem, niet in de prompt zelf. Daarom geldt: denk in kleinere commits. Lever de workflow in smalle stukken, valideer elke grens en verhard de integratie voordat je de scope van de agent uitbreidt.

<a id="agentic-workflows-integreren-in-bestaande-systemen"></a>
## Agentic workflows integreren in bestaande systemen

De veiligste instappunten zijn de saaie, en dat is een kracht. Wrap een bestaande API als tool, houd de workflow binnen een microservicegrens of draai de agent-loop naast een menselijke wachtrij die al goedkeuringsstappen heeft. Die patronen houden de systemen die je vertrouwt op hun plaats terwijl de agent een smalle taak krijgt.

Identiteitspropagatie moet expliciet zijn. Als de workflow retried, moet dezelfde state overleven, dezelfde actie mag niet dupliceren en het trace moet tonen welke tenant of welk verzoek de stap triggerde. Kostenattributie is ook belangrijk, want gedeelde infrastructuur kan weggelopen spend verbergen totdat het verkeerde team ervoor betaalt.

<a id="integratiecontracten-moeten-er-vanaf-dag-één-zijn"></a>
### Integratiecontracten moeten er vanaf dag één zijn

De uitrolchecklist is eenvoudig te zeggen en moeilijk te faken:

1. **Idempotente toolcalls** zodat retries geen dubbele side effects creëren.
2. **Schema-gevalideerde input en output** zodat malformed acties vroeg worden geblokkeerd.
3. **Versiebeheerde prompts en tooldefinities** zodat je gedrag tussen releases kunt vergelijken.
4. **Rollbackpaden** voor elke actie die state kan veranderen.
5. **Return-to-human-regels** die exact definiëren wanneer de controle de agent verlaat.

Een referentie-implementatie kan helpen, maar alleen als deze past in de stack die je al draait. Een praktisch voorbeeld is [KLM luchthaven-slotbeheerautomatisering](https://www.mory.dev/projects/klm-airport-slot-management-automation/), dat laat zien hoe workflowautomatisering bestaande systeemgrenzen, goedkeuringspaden en operationele beperkingen moet respecteren.

Een productiegericht voorbeeld is Dario Mory, dat zich richt op het naar productie brengen van prototypes met evaluatiepijplijnen, guardrails en kostenbeheersing per eenheid. Dat soort leveringswerk doet er alleen toe wanneer het past in het systeem dat er al is.

De volgorde telt. Zet eerst observeerbaarheid in, dan begrensde autoriteit, dan evaluatie. Elke laag maakt de volgende nuttiger. Als je die volgorde omdraait, krijg je vaak een systeem dat er geavanceerd uitziet maar niet te vertrouwen is.

<a id="vragen-die-technisch-leiders-stellen-vóór-de-lancering"></a>
## Vragen die technisch leiders stellen vóór de lancering

De eerste vraag is eigendom. Als de agent de actie doet, wie is eigenaar van de uitkomst en hoe wordt het gelogd? Het antwoord moet een benoemde mens of team zijn, met een trace die de beslissing, de toolcall en de resulterende statewijziging vastlegt. Zonder dat heb je geen verantwoording; je hebt automatisering zonder operator.

De tweede vraag is legacy-integratie. Een stabiel API-contract is meestal goedkoper te verdedigen dan directe toegang tot interne services, vooral wanneer de agent nog de vorm van de workflow leert. Directe integratie kan werken, maar alleen wanneer de servicegrens al volwassen is, rechten strak zijn en het rollbackpad echt is.

De derde vraag is budget. Elke workflow moet een **kostenplafond per actie**, een tokenbudget en een circuit breaker voor abnormale loops hebben. Als een taak niet binnen dat enveloppe kan blijven, is het niet klaar om onbeheerd in productie te draaien.

De moeilijkste vraag is wanneer je helemaal geen agents moet gebruiken. Als een deterministische regelingenengine, een goed afgestelde retrievalworkflow of een eenvoudig geschreven proces het probleem oplost met lagere variantie, lever dat dan. Agents horen thuis waar de input dubbelzinnig is, de taak multi-step is en toolgebruik het plan verandert.

| Werkbelastingskenmerk | Aanbevolen aanpak | Reden |
| --- | --- | --- |
| Duidelijke regels en stabiele input | Regelingenengine of deterministische workflow | Lagere variantie en makkelijker debuggen |
| Vooral retrieval en samenvatting | RAG-pipeline | Eenvoudigere controle en sterkere voorspelbaarheid |
| Dubbelzinnige input met toolgebruik | Agentic workflow | Heeft planning plus actie nodig |
| Hoogrisico onomkeerbare actie | Door mensen goedgekeurde workflow | Controle is belangrijker dan autonomie |
| Herhaald multi-step operationeel werk | Agent met begrensde autoriteit | Automatisering loont wanneer de loop is beperkt |

Agentische systemen zijn nuttig wanneer ze een team helpen echt werk te doen dat vroeger handmatige coördinatie vereiste. Ze zijn een slechte keuze wanneer de organisatie een demo wil, maar niet de discipline die productie vereist.
