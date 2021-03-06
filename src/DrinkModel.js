import { getAllIngredients, getDrinkDetails} from "./drinkSource";
import resolvePromise from "./resolvePromise";

class DrinkModel {

    constructor() {
        this.observers = [];
        this.drinks = [];
        this.ratings = [];
        this.currentDrinkPromiseState = {};
        this.previousHash = "#search"
        this.currentUser = {};
        this.users = [];
    }

    setHash(hash){
        this.previousHash = hash
    }

    setCurrentUser(user){
        this.currentUser = user;
    }

    addUser(user){

        var i;
            for(i = 0; i < this.users.length; i++){
                if(this.users[i].user.toLowerCase() == user.user.toLowerCase()){
                    return "Username already exists";
                }
            }
        
        if(user.pass.length < 6 || user.pass.length > 20) {
            return "Password should be between 6 and 20 characters!";
        }

        if(user.user.length < 3 || user.user.length > 20) {
            return "Username should be between 3 and 20 characters!";
        }

        if(user.user.toLowerCase() == user.pass.toLowerCase()) {
            return "Username can not be the same as password!";
        }

        this.users = [...this.users, user];
        this.notifyObservers({addUser: user})
        return "New user successfully created!";
    }

    deleteUser(user){
        function sameUserCB(u) { 
            if (u.user != user.user) {
                return false
            }
        }

        if(this.users.filter(sameUserCB).length != this.users.length) {
            this.users = this.users.filter(sameUserCB);
            this.drinks = [];
            this.ratings = [];
            this.notifyObservers({removeUser: user});
        }

    }

    checkValidUser(user){
        var i;
        for(i = 0; i < this.users.length; i++){
            if(this.users[i].user == user.user && this.users[i].pass == user.pass){
                this.currentUser = user;
                return true
            }
        }
        return false;
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
        const theModel = this;
        
        function notifyACB(){return theModel.notifyObservers();}
        
        if(drinkid !== undefined){
            resolvePromise(getDrinkDetails(drinkid), this.currentDrinkPromiseState, notifyACB);
            this.notifyObservers({setCurrentDrink: drinkid});
        }

        this.currentDrink = drinkid;
        this.notifyObservers.bind(this);
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