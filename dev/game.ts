class Game {
    
    private breakfast:Breakfast;
    private gandalf1:Gandalf;
    private gandalf2:Gandalf;
    private ork1:Ork;
    private ork2:Ork;

    constructor() { 
        this.breakfast = new Breakfast();
        this.gandalf1 = new Gandalf();
        this.gandalf2 = new Gandalf();
        this.ork1 = new Ork();
        this.ork2 = new Ork();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    private gameLoop(){
        this.breakfast.update();
        
        this.gandalf1.update();
        this.gandalf2.update();
        this.ork1.update();
        this.ork2.update();

        requestAnimationFrame(() => this.gameLoop());
    }


    // demo code om een object uit een array te verwijderen
    /*
    private removeFromArray(object:something){
        let i:number = this.array.indexOf(object);
        if(i != -1) {
            this.array.splice(i, 1);
        }
    }
    */
} 