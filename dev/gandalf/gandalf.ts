/// <reference path="../gameobject.ts" />
/// <reference path="./behaviour.ts" />
/// <reference path="./hungry.ts" />
/// <reference path="./leaving.ts" />
/// <reference path="./sleeping.ts" />

class Gandalf extends Gameobject implements Observer {

    public xTarget: number;
    public yTarget: number;
    public callback: EventListener;
    public tag: string;

    private behaviour: Behaviour;
    private action: string;

    constructor() {
        super();
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight - 110);
        this.speedmultiplier = Math.random() + 1;

        this.tag = "gandalf";
        this.div = document.createElement(this.tag);
        document.body.appendChild(this.div);
        this.div.style.backgroundImage = "url(images/" + this.tag + "_hungry.png)";

        // we slaan de click handler op in een variabele zodat we die makkelijk een listener kunnen toevoegen en verwijderen als het nodig is
        this.callback = (e: MouseEvent) => this.onClick(e);

        // constructor settings afhankelijk van de action
        this.setAction();
        switch (this.action) {
            case "hungry":
                this.behaviour = new Hungry(this);
                break;
            case "leaving":
                this.behaviour = new Leaving(this);
                break;
            case "sleeping":
                this.behaviour = new Sleeping(this);
                break;
        }
    }

    private setAction = () => {
        if (Math.random() < 0.5) {
            this.action = "sleeping";
        } else {
            this.action = "hungry";
        }
    }

    // update afhankelijk van de action
    public update() {
        switch (this.action) {
            case "hungry":
                this.behaviour.action();
                break;
            case "leaving":
                this.behaviour.action();
                break;
            case "sleeping":
                this.behaviour.action();
                break;
        }

        // in scherm tekenen
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    }

    public onClick(e: MouseEvent): void {
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.div.style.cursor = "auto";
        this.div.removeEventListener("click", this.callback);

        this.action = "hungry";
        this.behaviour = new Hungry(this);
    }

    // een random doel om naartoe te lopen
    public setTarget() {
        this.xTarget = Math.random() * (window.innerWidth - 80);
        this.yTarget = Math.random() * (window.innerHeight - 120);
    }


    // deze functie rekent de loopsnelheid uit
    public setSpeed(xdist: number, ydist: number): void {
        let distance: number = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;

        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    }

    public notify = () => {
        if (this.action === "hungry") {
            this.behaviour = new Leaving(this);
            this.action = "leaving";
        }
    }

    public goBackToSleep = () => {
        if (this.action === "hungry") {
            this.behaviour = new Sleeping(this);
            this.action = "sleeping";
        }
    }

}