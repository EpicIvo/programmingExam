class Gandalf {

    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public facing:number = 1;
    public div: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public width:number;
    public height:number;
    
    private xTarget:number;
    private yTarget:number;
    private callback:EventListener;
    private tag:string;
        
    constructor() {
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight - 110);
        this.speedmultiplier = Math.random() + 1;

        this.tag = "gandalf";
        this.div = document.createElement(this.tag);
        document.body.appendChild(this.div);
        this.div.style.backgroundImage = "url(images/"+this.tag+"_hungry.png)";

        // we slaan de click handler op in een variabele zodat we die makkelijk een listener kunnen toevoegen en verwijderen als het nodig is
        this.callback = (e:MouseEvent) => this.onClick(e);

        // constructor settings afhankelijk van de action
        let action = "sleeping";
        switch(action){
        case "hungry" :
            this.div.style.backgroundImage = "url(images/"+this.tag+"_hungry.png)";
            this.div.style.cursor =  "auto";
            this.setTarget();
            break;
        case "leaving" :
            this.div.style.backgroundImage = "url(images/"+this.tag+"_leaving.png)";
            this.div.style.cursor =  "auto";
            this.xTarget = Math.random() * window.innerWidth;
            this.yTarget = window.innerHeight + 300;
            this.speedmultiplier += 1;
            break;
        case "sleeping" :
            this.div.style.backgroundImage = "url(images/"+this.tag+"_sleep.png)";
            this.div.style.cursor =  "pointer";
            this.div.addEventListener("click", this.callback);
            break;
        }
    }

    // update afhankelijk van de action
    public update(){
        let action = "sleeping";
        switch(action){
        case "hungry" :
            this.hungry();
            break;
        case "leaving" :
            this.leaving();
            break;
        case "sleeping" :
            this.sleeping();
            break;
        }

        // in scherm tekenen
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.facing+",1)";
    }

    public onClick(e:MouseEvent):void {
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.div.style.cursor =  "auto";
        this.div.removeEventListener("click", this.callback);
    }

    //
    // de hungry update laat een karakter random door het beeld heen en weer lopen
    //
    public hungry(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        let xdistance = this.xTarget - this.x;
        let ydistance = this.yTarget - this.y;
        if(xdistance < 4 && ydistance < 4) this.setTarget();
        this.setSpeed(xdistance, ydistance);
    }

    //
    // de leaving update laat een karakter uit beeld lopen
    //
    public leaving(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        let xdistance = this.xTarget - this.x;
        let ydistance = this.yTarget - this.y;
        if(xdistance < 4 && ydistance < 4) {
            console.log("het karakter is uit beeld");
        }
        this.setSpeed(xdistance, ydistance);
    }
    
    //
    // de sleeping update doet niets
    //
    public sleeping(){
        //
    }

    // een random doel om naartoe te lopen
    private setTarget(){
        this.xTarget = Math.random() * (window.innerWidth-80);
        this.yTarget = Math.random() * (window.innerHeight-120);
    }


    // deze functie rekent de loopsnelheid uit
    private setSpeed(xdist:number, ydist:number):void {
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist/distance;
        this.yspeed = ydist/distance;

        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    }

}