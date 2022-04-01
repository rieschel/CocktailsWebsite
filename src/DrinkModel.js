class DrinkModel {

    constructor() {
        this.drinks = ["cosmopolitan", "gin and tonic", "martini"];
    }

    saveDrink(drink) {
        this.drinks = [...this.drinks, drink];
    }

}

export default DrinkModel;