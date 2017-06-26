class Breakfast implements Subject {

    private counter: number = 0;
    private bar: HTMLElement;
    private button: HTMLElement;
    private callback: EventListener;

    public observerCollection: Array<Observer>;

    constructor() {
        this.bar = <HTMLElement>document.getElementsByTagName("bar")[0];
        this.button = <HTMLElement>document.getElementsByTagName("foodbutton")[0];
        this.button.style.cursor = "auto";
        this.callback = (e: MouseEvent) => this.onClick(e);

        this.observerCollection = new Array<Observer>();
    }

    public update(): void {
        this.counter = Math.min(1, this.counter + 0.003);
        this.bar.style.width = (143 * this.counter) + "px";

        if (this.counter >= 1) {
            this.button.classList.add("blinking");
            this.button.addEventListener("click", this.callback);
            this.button.style.cursor = "pointer";
        }
    }

    private onClick(e: MouseEvent): void {
        console.log("Ontbijtjes uitdelen!");

        this.notifyObservers();

        this.counter = 0;
        this.button.removeEventListener("click", this.callback);
        this.button.classList.remove("blinking");
        this.button.style.cursor = "auto";
    }

    public subscribe(o: Observer) {
        this.observerCollection.push(o);
    };

    public unSubscribe(o: Observer) {
        for (let i = 0; i < this.observerCollection.length; i++) {
            if (this.observerCollection[i] == o) {
                this.observerCollection.splice(i, 1);
            }
        }
    };

    public notifyObservers() {
        for (let o of this.observerCollection) {
            o.notify();
        }
    };
}