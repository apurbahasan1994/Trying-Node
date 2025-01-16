export default class PaymentSubject{
    #obsevers = new Set();

    notify(data){
        this.#obsevers.forEach(observer=>{
            observer.update(data);
        })
    }

    unsubscribe(observable){
        this.#obsevers.delete(observable);
    }

    subscribe(observable){
        this.#obsevers.add(observable)
    }
}