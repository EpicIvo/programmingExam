# PRG08 Tentamen

## Gandalf Clicker

Gandalf wordt ook alweer een jaartje ouder. Hij is tegenwoordig vooral een beetje aan het aanrommelen, tenminste als hij wakker is. Om toch nog van nut te zijn in het gevecht tegen het kwaad, heeft hij zichzelf 1000 keer gekloond. Hij heeft nu alleen niet genoeg ontbijt in huis.

- Lees de [Toetsinstructie PDF](gandalfclicker_2016_2017_instructie.pdf) goed door.
- Bekijk de beoordelingscriteria.
- Vul het opleverdocument in voordat je het project inlevert.

![screenshot](docs/images/screenshot.png "Screenshot")


## Proudly hosted at

-> http://ivovanderknaap.nl/typescript/docs/ 😎

## Opleverdocument

**Interface en inheritance**

#### Interface

'observer.ts' en 'subject.ts' zijn beide interfaces. Ik heb deze beiden een interface gemaakt omdat ik observer en subject beide als blauwdruk wilde benoemen, zo kon ik door ze te laten implementeren door andere objecten het Observer pattern foutloos uitwerken. Door alle function behorende bij het observer pattern in de interface te benoemen kon ik het observer pattern foutloos uitwerken. De functies moeten dan namelijk in het object die de interface implementeerd zitten. Dit maakt de code ook overzichtelijk en meer leesbaar.

#### inheritance

Ik heb een almene abstracte class aangemaakt: Gameobject. Deze class heeft een aantal variabelen en methoden die worden gebruikt door Gandalf en Ork. Daarom erven Gandalf en Ork beide deze functionaliteiten van de Gameobject class. Dit maakt de code ook overzichtelijk en meer leesbaar.

**Abstracte class**

Ik heb een almene abstracte class aangemaakt: Gameobject. Deze class heb ik abstract gemaakt omdat ik niet wil dat er een instantie van Gameobject zelf aan kan worden gemaakt. Gameobject is een class met functionaliteiten die alleen maar geerft mogen worden.

**Singleton**

De class Game die aangemaakt wordt bij de start van het spel heb ik gemaakt in de vorm van een Singleton. Ik heb dit gedaan omdat er zo maar 1 instantie van de class game kan zijn. Er zijn niet meer instanties van de game class nodig dus was een singleton de beste optie.

**Polymorfisme**

Alle Gandalfs en Orks erven functionaliteiten van Gameobject. Ik heb in de Game class een array aangemaakt die het type Gameobject kan ontvangen. Hier stop ik verderop Gandalfs en Orks in. In de gameloop wordt van alle Gameobjects die in de gameobjects array zitten de update methode aangeroepen. De update functie is bij Gandalf anders dan bij Ork, dit leidt to Polymorfisme. Dezelfde update methode op gameobjects wordt aangeroepen alleen omdat deze bij Gandalf anders in dan bij Ork gebeurd er bij beide instanties iets anders.

**Strategy**

Gandalf heeft 3 verschillende states waar hij zich in kan bevinden (Sleeping, Hungry en Leaving). Deze verschillende states heb ik verwerkt in een Strategy pattern. De drie states hebben allen een eigen class die erft van de interface Behaviour. Bij de wisseling van een state veranderd de behaviour variabele van Gandalf in een nieuwe instantie van een andere behaviour ('this.behaviour = new Hungry(this);'). Op die manier maak ik gebruik van het strategy pattern.

**Observer**

De knop die ervoor zorgt dat alle Gandalfs te eten krijgen is de Subject van het observer pattern. De Gandalfs zelf zijn de Observers. Als een Gandalf wordt aangemaakt subscribed hij zich gelijk aan de knop. De knop heeft een array vol met alle Gandalfs. Als er op de knop wordt geklikt veranderen alle Gandalfs van state "hungry" naar "leaving". De notifyObservers methode van de knop zorgt ervoor dat alle Gandalfs hun notrify methode uitvoeren. Op deze manier maak ik gebruik van het Observer pattern. 

**Gandalf stuurt kaartje**

Gelukt, als een Gandalf uit het spel is stuurt hij een kaart. En als hij langer dan 5 seconden hongerig is valt hij weer in slaap.

**Game start met random gandalfs en orks**

Gelukt, als de game start worden er een random aantal Gandalfs en Orks gegenereerd. Sommige Gandalfs hebben een "hungry" state en anderen hebben een "sleeping" state.
