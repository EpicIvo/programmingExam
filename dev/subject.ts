interface Subject {

    observerCollection: Array<Observer>;

    subscribe(o: Observer): void;
    unSubscribe(o: Observer): void;
    notifyObservers(): void;

}