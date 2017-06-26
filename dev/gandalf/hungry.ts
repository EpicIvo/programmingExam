/// <reference path="./behaviour.ts" />

class Hungry implements Behaviour{

    public gandalf: Gandalf;

    constructor(g: Gandalf) {
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/"+this.gandalf.tag+"_hungry.png)";
        this.gandalf.div.style.cursor =  "auto";
        this.gandalf.setTarget();
        setTimeout(this.gandalf.goBackToSleep, 5000);
    }

    //
    // de hungry update laat een karakter random door het beeld heen en weer lopen
    //
    public action = () => {
        this.gandalf.x += this.gandalf.xspeed;
        this.gandalf.y += this.gandalf.yspeed;
        let xdistance = this.gandalf.xTarget - this.gandalf.x;
        let ydistance = this.gandalf.yTarget - this.gandalf.y;
        if(xdistance < 4 && ydistance < 4) this.gandalf.setTarget();
        this.gandalf.setSpeed(xdistance, ydistance);
    }

}