import firebaseConfig from "/src/firebaseConfig.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import database from "firebase/compat/app"
//import {getDishDetails} from "/src/dishSource.js";
//import DinnerModel from "/src/DinnerModel.js";
import { getDatabase, onValue } from "firebase/database";

import {ref, set, get, child } from "firebase/database";
import {getDrinkDetails} from "./drinkSource.js";
import DrinkModel from "/src/DrinkModel.js";

firebase.initializeApp(firebaseConfig);  
//  REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="drinksModel";

function updateFirebaseFromModel(model){
    function observerACB(payload){
        console.log(payload)
        //console.log(payload.addDrink.idDrink)
        // The observer will need to check the payload to see if the change is relevant for persistence. 
        if (payload) {
            if(payload.addDrink){
                console.log(payload.addDrink)
                //firebase.database.ref(REF + "/savedDrinks").set(payload.addDrink.idDrink);
                const db = getDatabase();
                set(ref(db, REF + "/savedDrinks/" + payload.addDrink.idDrink), payload.addDrink.strDrink);
            }
            else if(payload.rateDrink){
                const db = getDatabase();
                set(ref(db, REF + "/ratings/" + payload.rateDrink.d), payload.rateDrink.r);
            }
        }
    }
    model.addObserver(observerACB);
}

function updateModelFromFirebase(model){

    /*function inMenu(dishID){
        function inMenuCB(dish){
            return dish.id == dishID;
        }   
        return (model.dishes.filter(inMenuCB).length > 0)
    }

    

    // Listen (on()) to the value firebase event on the path where we saved the number of guests. When the event comes, set the number of guest in the model.
    firebase.database().ref(REF+"/numberOfGuests").on("value",  
        function guestsChangedInFirebaseACB(firebaseData){ 
            model.setNumberOfGuests(firebaseData.val());
        }
    )   
    
    firebase.database().ref(REF+"/currentDish").on("value",  
        function currenDishChangedInFirebaseACB(firebaseData){ 
            model.setCurrentDish(firebaseData.val());
        }
    )*/

    function addToDrinkListCB(drinkid){
        console.log(drinkid);

        getDrinkDetails(drinkid).then(function addDishToMenuChangedInFirebaseACB(drink){
            console.log("saving drink")
            console.log(drink[0])
            model.saveDrink(drink[0]);
        })
    }

    // We go from dish id to dish data via a promise. 
    console.log("inside updating model from firebase")
    const db = getDatabase();
    //const ref = ref(db, REF + "/savedDrinks");
    onValue(ref(db, REF + "/savedDrinks"),
    //ref(db, REF+"/savedDrinks").on("child_added",
        function addedDrinkACB(firebaseData){
            console.log("testing updating model from firebase")
            console.log(firebaseData)
            console.log(firebaseData.key)
            console.log(firebaseData.val())
            console.log(Object.keys(firebaseData.val()))
            Object.keys(firebaseData.val()).map(addToDrinkListCB)

        }
    )

    // The model method removeFromMenu expects a dish but only uses the ID from that. -> build a dummy dish using an object literal
    /*firebase.database().ref(REF+"/dishes").on("child_removed",
        function removeDishACB(firebaseData){
            model.removeFromMenu({ id: +firebaseData.key })
        }
    )*/

}

// To avoid the user seeing dishes popping up one by one, we want to resolve a promise before we load the app. 
// We call it a "big promise" because it should only resolve when all dishes have been retrieved (all dish details promises have resolved) based on their IDs from Firebase.
function firebaseModelPromise(){

    function makeBigPromiseACB(firebaseData){
        function makeDrinkPromiseCB(dishId){
            return getDrinkDetails(dishId);
        }

        function createModelACB(drinkArray){
            return new DrinkModel(drinkArray);
        }

        //const dishPromiseArray= Object.keys(firebaseData.val().dishes).map(makeDishPromiseCB);
        console.log("inside big promise")
        console.log(firebaseData.val().savedDrinks)
        const drinkPromiseArray= Object.keys(firebaseData.val().savedDrinks).map(makeDrinkPromiseCB);
        return Promise.all(drinkPromiseArray).then(createModelACB)
    }

    //return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
    const dbRef = ref(getDatabase());
    return get(child(dbRef, REF)).then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};