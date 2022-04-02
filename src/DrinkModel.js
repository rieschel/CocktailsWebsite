class DrinkModel {

    constructor() {
        this.drinks = [];
    }

    saveDrink(drink) {
        console.log("drinkmodel save");
        this.drinks = [...this.drinks, drink];
        console.log(this.drinks);
    }

}

export default DrinkModel;