class Card  {
        
    public div: HTMLElement;

    constructor(x:number) {     
        this.div = document.createElement("card");
        document.body.appendChild(this.div);
        this.div.style.left = x + "px";
    }

}