class DrinkModel {

    constructor() {
        this.observers = [];
        this.drinks = [];
        this.alc = [{name:"gin", checked:false}, {name:"rum", checked:false}, {name:"vodka", checked:false}];
        this.garnish = [{name:"lemon", checked:false}, {name:"orange", checked:false}, {name:"basil", checked:false}];
    }

    saveDrink(drink) {

        function sameDrinkCB(d) { if (d['idDrink']!=drink['idDrink']) return true }

        if(this.drinks.filter(sameDrinkCB).length == this.drinks.length) {
            this.drinks = [...this.drinks, drink]
            this.notifyObservers({addDrink: drink});
            console.log("drinkmodel save");
        }
    }

    removeDrink(drink) {

        function sameDrinkCB(d) {if (d['idDrink']!=drink['idDrink']) return true }

        if(this.drinks.filter(sameDrinkCB).length != this.drinks.length) {
            this.drinks = this.drinks.filter(sameDrinkCB);
            this.notifyObservers({removeDrink: drink});
            console.log("in remove drink");
        }
    }

    addObserver(obs) {
        console.log("in addobserver");
        this.observers = [...this.observers, obs];
    }

    removeObserver(obs) {
        console.log("in removeObserver");
        this.observers = this.observers.filter(function isEqualCB(obs1) { if (obs1 != obs) return true; } );
    }

    notifyObservers(payload) {
        console.log("in notifyObservers");
        try {
            this.observers.forEach(function invokeObserverCB(obs) { obs(payload); });
        }
        catch (err) {
            console.log(err);
        }
    }

}

export default DrinkModel;