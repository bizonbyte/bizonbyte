---
title: "Schalen met Low-Code: Waar Nederlandse bedrijven struikelen"
date: "2026-05-05"
author: "Bizonbyte Team"
---

![A glass greenhouse structure with mature plants pressing against every pane, some cracking under the weight — morning light casting long shadows across overgrown pathways, suggesting beautiful growth that has exceeded its container](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-1-a-glass-greenhouse-structure-with-mature-plan.png)

De vraag die Nederlandse bedrijven blijven stellen is de verkeerde. "Kan low-code schalen?" impliceert dat schalen vooral een technische beperking is - dat ergens rond de tienduizend gebruikers of honderd integraties het platform simpelweg omvalt. Deze framing stuurt teams op jacht naar benchmarkvergelijkingen en beloftes van leveranciers over doorvoer.

De werkelijke faalwijze is anders. Low-code schaalt technisch prima. Wat kapot gaat is governance, samenhang in de architectuur en het vermogen om van richting te veranderen. Nederlandse bedrijven struikelen niet omdat ze tegen een plafond aanlopen, maar omdat ze zichzelf in bochten wringen waar ze niet uit kunnen komen.

## De governanceschuld waar niemand voor budgetteert

De meeste organisaties gebruiken low-code om de oplevering te versnellen. De pitch werkt: burgerontwikkelaars leveren interne tools in enkele weken, IT backlogs krimpen, business units voelen zich autonoom. Het eerste jaar lijkt pure winst.

In het derde jaar verandert het beeld. Een middelgroot logistiek bedrijf in Rotterdam heeft misschien veertig Mendix-applicaties gebouwd door twaalf verschillende teams. Sommige volgen naamconventies. Sommige hebben documentatie. De meeste hebben geen van beide. De oorspronkelijke bouwers zijn verder gegaan en niemand kan met zekerheid zeggen welke apps klantgegevens aanraken, welke verbinding maken met het ERP, of welke kapot zouden gaan als de authenticatieprovider zou veranderen.

Dit is geen platformprobleem. [Mendix](https://www.mendix.com/), [OutSystems](https://www.outsystems.com/), en [Microsoft Power Platform](https://powerplatform.microsoft.com/) bieden allemaal tooling voor governance. Het probleem is dat organisaties governance behandelen als optionele overhead in plaats van schaalbare infrastructuur. Ze budgetteren voor ontwikkelingssnelheid, maar niet voor het register, het beoordelingsproces of de architectuurstandaarden die een groeiende portfolio coherent houden.

De struikelpartij vindt plaats wanneer iemand uiteindelijk een audit moet uitvoeren, moet refactoren of moet integreren in dat portfolio. De kosten om te begrijpen wat er bestaat overstijgen de kosten om het opnieuw op te bouwen. Op dat moment verdampt de oorspronkelijke tijdsbesparing.

## Architectuurdrift gebeurt sneller dan je denkt

Traditionele ontwikkeling heeft een natuurlijke rem op architecturale chaos: wrijving. Het schrijven van aangepaste code kost tijd, vereist reviews, vereist infrastructuurbeslissingen. Die wrijving creëert mogelijkheden voor iemand om zich af te vragen of een nieuwe service eigenlijk wel in de architectuur thuishoort.

Low-code neemt de wrijving bewust weg. Een bedrijfsanalist kan in een middag een nieuwe applicatie opzetten. Dit is de eigenschap, niet de bug. Maar het betekent wel dat de architectuurdrift evenredig versnelt.

![An aerial view of a Dutch polder landscape where water channels have been extended haphazardly — some running parallel, some crossing, some dead-ending — with small pumping stations scattered without apparent coordination](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-2-an-aerial-view-of-a-dutch-polder-landscape-wh.png)

Een financiële dienstverlener in Amsterdam ontdekte dit na drie jaar enthousiaste adoptie van het Power Platform. Ze hadden zevenentachtig Power Apps gebouwd, elk op zich zinvol, elk voor het oplossen van een echt probleem. Maar de apps hadden verschillende conventies ontwikkeld voor gebruikersidentiteit, verschillende patronen voor gegevensopslag, verschillende aannames over API-contracten. Om ze met elkaar te verbinden tot coherente workflows moest een vertaallaag worden gebouwd die complexer was dan de oorspronkelijke applicaties.

De les is niet dat low-code slechte architectuur veroorzaakt. De les is dat low-code eerder en explicieter architectuurdiscipline vereist dan traditionele ontwikkeling. Het platform zal die discipline niet voor je opleggen.

## De vraag over de leveranciersvergrendeling is reëel maar wordt verkeerd begrepen

Nederlandse bedrijven noemen vaak vendor lock-in als hun grootste zorg over low-code schalen. Deze zorg is legitiem, maar meestal te vaag uitgedrukt om nuttig te zijn.

Lock-in bestaat op een spectrum. Aan de ene kant: je visuele logica en UI-componenten zijn propriëtair en kunnen niet worden geëxtraheerd. Aan de andere kant: uw gegevens staan in standaardformaten, uw integraties gebruiken gedocumenteerde API's en als u van platform verandert, moet u interfaces opnieuw bouwen maar geen informatie herstellen.

De praktische vraag is niet of u vastzit, maar of u vastzit op een niveau dat u kunt tolereren. Een tool voor workflowautomatisering die uw bedrijfslogica vastlegt, is anders dan een tool die uw knoppenstijl vastlegt. De meeste organisaties kunnen leven met het tweede; weinigen zouden het eerste moeten accepteren.


Het struikelblok ontstaat wanneer bedrijven alle lock-in als gelijkwaardig beschouwen en ofwel low-code volledig vermijden of overnemen zonder te onderzoeken wat er specifiek moeilijk te veranderen is. De productieve middenweg vereist dat u weet waar uw gegevens zich bevinden, hoe ze kunnen worden geëxtraheerd en welke bedrijfslogica alleen bestaat als platformspecifieke visuele configuratie.

## Wat succesvol schalen eigenlijk vereist

De bedrijven die low-code succesvol schalen hebben een paar kenmerken gemeen. Ze zetten platform governance op vanaf de eerste dag, niet als een herstelproject in het derde jaar. Ze wijzen architectural ownership aan - iemand wiens taak het is om nee te zeggen tegen applicaties die de integratiestandaarden schenden. Ze behandelen low-code als een leveringsmechanisme, niet als een vervanging voor technisch oordeel.

Dit betekent investeren in mogelijkheden die aanvoelen als overhead tijdens de enthousiaste beginfase. Registersystemen. Codebeoordelingsprocessen die zijn aangepast voor visuele ontwikkeling. Integratiestandaarden die bepalen hoe nieuwe applicaties aansluiten op bedrijfssystemen. Documentatie-eisen die het personeelsverloop overleven.

Niets van dit alles is exotisch. Het is dezelfde operationele volwassenheid die traditionele ontwikkeling duurzaam maakt op schaal. Het verschil zit hem in de timing: met low-code kun je deze investering langer uitstellen terwijl je sneller schulden opbouwt.

## De echte vraag die je moet stellen

"Kan low-code schalen?" is de verkeerde vraag omdat het een frame accepteert waarin schalen iets is dat je overkomt. De nuttige vraag is: "Zijn we de operationele capaciteit aan het opbouwen om dit bewust op te schalen?"

![A control room with multiple monitoring screens showing different applications — some screens green and organised, others amber with warning indicators, one showing a dependency map that has become an incomprehensible tangle](/blog/scaling-with-low-code-where-dutch-firms-stumble-img-3-a-control-room-with-multiple-monitoring-scree.png)

Nederlandse bedrijven struikelen wanneer ze low-code behandelen als een manier om het bouwen van die capaciteit te vermijden in plaats van als een ander oppervlak om die capaciteit te oefenen. Het platform laat je graag honderd applicaties bouwen zonder governance, zonder architectuurstandaarden, zonder documentatie. Het zal je niet tegenhouden. Het zal alleen de uiteindelijke correctie duurder maken.

De organisaties die succesvol zijn, herkennen dit al vroeg. Ze spenderen de eerste maanden aan het vaststellen van beperkingen die onnodig aanvoelen wanneer het portfolio klein is. Ze accepteren dat low-code de oplevering van individuele applicaties versnelt, maar niet de volwassenheid die nodig is om een portfolio van applicaties te beheren.

Als uw organisatie een schalingspunt nadert - of probeert te herstellen van een schalingspunt - is het startpunt niet een platformevaluatie. Het is een eerlijke beoordeling van de vraag of u de operationele infrastructuur hebt gebouwd die schaalvergroting vereist. Het platform is niet de beperking. Dat is je bereidheid om het te beheren.

---

<video controls autoplay muted loop playsinline style="max-width: 100%; height: auto;">
  <source src="/blog/meme_f667b265_f669e1.mp4" type="video/mp4" />
  Uw browser ondersteunt deze video niet.
</video>

_Nederlandse bedrijven schalen met low-code en doen alsof alles onder controle is._