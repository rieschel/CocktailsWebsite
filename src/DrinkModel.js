class DrinkModel {

    constructor() {
        this.observers = [];
        this.drinks = [];
        this.ratings = [];
        this.currentDrink;
    }

    saveDrink(drink) {

        function sameDrinkCB(d) { if (d['idDrink']!=drink['idDrink']) return true }

        if(this.drinks.filter(sameDrinkCB).length == this.drinks.length) {
            this.drinks = [...this.drinks, drink]
            this.notifyObservers({addDrink: drink});
        }
    }

    removeDrink(drink) {

        function sameDrinkCB(d) {if (d['idDrink']!=drink['idDrink']) return true }

        if(this.drinks.filter(sameDrinkCB).length != this.drinks.length) {
            this.drinks = this.drinks.filter(sameDrinkCB);
            this.notifyObservers({removeDrink: drink});
        }
    }

    rateDrink(drink, rating) {

        function sameDrinkCB(e) {if (e.d!=drink['idDrink']) return true }

        if(this.ratings.filter(sameDrinkCB).length != this.ratings.length) {
            this.ratings = this.ratings.filter(sameDrinkCB);
        }

        this.ratings = [...this.ratings, {d: drink['idDrink'], r: rating}];
        this.notifyObservers({rateDrink: {d: drink['idDrink'], r: rating}});
    }

    setCurrentDrink(drinkid) {
        this.currentDrink = drinkid;
        this.notifyObservers({setCurrentDrink: drinkid});
        console.log("Current drink");
        console.log(drinkid);
    }

    addObserver(obs) {
        this.observers = [...this.observers, obs];
    }

    removeObserver(obs) {
        this.observers = this.observers.filter(function isEqualCB(obs1) { if (obs1 != obs) return true; } );
    }

    notifyObservers(payload) {
        try {
            this.observers.forEach(function invokeObserverCB(obs) { obs(payload); });
        }
        catch (err) {
            console.log(err);
        }
    }

}

export default DrinkModel;