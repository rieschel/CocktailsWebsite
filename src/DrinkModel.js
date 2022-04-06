class DrinkModel {

    constructor() {
        this.observers = [];
        this.drinks = [];
        this.ratings = [];
    }

    saveDrink(drink) {

        console.log("inside save drink")

        function sameDrinkCB(d) { if (d['idDrink']!=drink['idDrink']) return true }

        if(this.drinks.filter(sameDrinkCB).length == this.drinks.length) {
            this.drinks = [...this.drinks, drink]
            console.log(drink)
            console.log("inside save drink")
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

    rateDrink(drink, rating) {

        function sameDrinkCB(e) {if (e.d!=drink['idDrink']) return true }

        if(this.ratings.filter(sameDrinkCB).length != this.ratings.length) {
            console.log("heeej");
            this.ratings = this.ratings.filter(sameDrinkCB);
        }

        this.ratings = [...this.ratings, {d: drink['idDrink'], r: rating}];
        this.notifyObservers({rateDrink: {d: drink['idDrink'], r: rating}});
        console.log("rate drink in model");
        console.log(this.ratings);
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