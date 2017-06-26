class Game {
    
    private breakfast:Breakfast;
    private gandalf1:Gandalf;
    private gandalf2:Gandalf;
    private ork1:Ork;
    private ork2:Ork;

    private gameobjects: Array<Gameobject>;
    private cards: Array<Card>;

    private static instance: Game;

    private constructor() { 
        this.breakfast = new Breakfast();
        this.gameobjects = new Array<Gameobject>();
        this.cards = new Array<Card>();

        // Add Gandalfs
        let randomGandalfNumber: number = Math.random() * 10;
        for(let i = 0; i < randomGandalfNumber; i++){
            let gandalf: Gandalf;
            gandalf = new Gandalf();
            this.breakfast.subscribe(gandalf);
            this.gameobjects.push(gandalf);
        }

        // Add Orks
        let randomOrkNumber: number = Math.random() * 10;
        for(let i = 0; i < randomOrkNumber; i++){
            let ork: Ork;
            ork = new Ork();
            this.gameobjects.push(ork);
        }
    
        setInterval(this.addMoarr, 2000);

        requestAnimationFrame(() => this.gameLoop());
    }
    
    public static getInstance = (): Game => {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };

    private gameLoop(){
        this.breakfast.update();
        
        for(let gameobject of this.gameobjects){
            gameobject.update();
            if(gameobject.inMordor){
                this.removeFromArray(gameobject);
                this.cards.push(new Card(100));
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    // demo code om een object uit een array te verwijderen
    private removeFromArray(g: Gameobject){
        let i:number = this.gameobjects.indexOf(g);
        if(i != -1) {
            this.gameobjects.splice(i, 1);
        }
    }

    private addMoarr = () => {
        let randomGandalfNumber: number = Math.random() * 4;
        for(let i = 0; i < randomGandalfNumber; i++){
            let gandalf: Gandalf;
            gandalf = new Gandalf();
            this.breakfast.subscribe(gandalf);
            this.gameobjects.push(gandalf);
        }
    }
} 