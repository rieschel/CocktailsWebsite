import firebaseConfig from "/src/firebaseConfig.js";
import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/auth';
import 'firebase/firestore';
import {getDrinkDetails} from "./drinkSource.js";
import DrinkModel from "/src/DrinkModel.js";

firebase.initializeApp(firebaseConfig);  
const REF="drinksModel";

function updateFirebaseFromModel(model){
    function observerACB(payload){
        if (payload) {
            if(payload.addDrink){
                firebase.database().ref(REF+"/savedDrinks/" + payload.addDrink.idDrink).set(payload.addDrink.strDrink);
            }
            else if(payload.rateDrink){
                firebase.database().ref(REF+"/ratings/" + payload.rateDrink.d).set(payload.rateDrink.r);
            }
            else if(payload.removeDrink){
                firebase.database().ref(REF+"/savedDrinks/" + payload.removeDrink.idDrink).set(null);
            }
        }
    }
    model.addObserver(observerACB);
}

function updateModelFromFirebase(model){

    function inDrinkList(drinkID){
        function inDrinkListCB(drink){
            return drink.idDrink == drinkID;
        }   
        return (model.drinks.filter(inDrinkListCB).length > 0)
    }

    firebase.database().ref(REF+"/savedDrinks").on("child_added",
        function addedDishACB(firebaseData){
            if(!inDrinkList(+firebaseData.key)){
                getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                    model.saveDrink(drink[0]);
                })
            }
        }
    )

    firebase.database().ref(REF+"/savedDrinks").on("child_removed",
        function removeDrinkACB(firebaseData){
            console.log("inside remove")
            getDrinkDetails(+firebaseData.key).then(function removeDrinkFromListACB(drink){
                model.removeDrink(drink[0]);
            })
        }
    )

    firebase.database().ref(REF+"/ratings").on("child_added",
        function addedRatingACB(firebaseData){
            getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                model.rateDrink(drink[0], firebaseData.val());
            })
    })

    firebase.database().ref(REF+"/ratings").on("child_changed",
        function addedRatingACB(firebaseData){
            getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                model.rateDrink(drink[0], firebaseData.val());
            })
    })

    
}


function firebaseModelPromise(){

    function makeBigPromiseACB(firebaseData){
        function makeDrinkPromiseCB(dishId){
            return getDrinkDetails(dishId);
        }

        function createModelACB(drinkArray){
            return new DrinkModel(drinkArray);
        }

        if(!firebaseData.val().savedDrinks){
            return new DrinkModel();
        }else{
            const drinkPromiseArray= Object.keys(firebaseData.val().savedDrinks).map(makeDrinkPromiseCB);
            return Promise.all(drinkPromiseArray).then(createModelACB)
        }
    }

    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};