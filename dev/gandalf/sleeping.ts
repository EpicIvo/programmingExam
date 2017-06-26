/// <reference path="./behaviour.ts" />

class Sleeping implements Behaviour{

    public gandalf: Gandalf;

    constructor(g: Gandalf) {
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/"+this.gandalf.tag+"_sleep.png)";
        this.gandalf.div.style.cursor =  "pointer";
        this.gandalf.div.addEventListener("click", this.gandalf.callback);
    }

    //
    // de sleeping update doet niets
    //
    public action = () => {
    }

}