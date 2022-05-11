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
                firebase.database().ref(REF+"/savedDrinks/" + model.currentUser.user + "/" + payload.addDrink.idDrink).set(payload.addDrink.strDrink);
            }
            else if(payload.rateDrink){
                firebase.database().ref(REF+"/ratings/" + model.currentUser.user + "/" + payload.rateDrink.d).set(payload.rateDrink.r);
            }
            else if(payload.removeDrink){
                firebase.database().ref(REF+"/savedDrinks/" + model.currentUser.user + "/" + payload.removeDrink.idDrink).set(null);
            }
            else if(payload.addUser){
                firebase.database().ref(REF+"/users/" + payload.addUser.user).set(payload.addUser.pass);
            }
            else if(payload.removeUser){
                firebase.database().ref(REF+"/users/" + payload.removeUser.user).set(null);
                firebase.database().ref(REF+"/savedDrinks/" + payload.removeUser.user).set(null);
                firebase.database().ref(REF+"/ratings/" + payload.removeUser.user).set(null);
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

    firebase.database().ref(REF+"/users").on("child_added",
        function addedUserACB(firebaseData){
            model.addUser({user: firebaseData.key, pass: firebaseData.val()});
        }
    )

    firebase.database().ref(REF+"/users").on("child_removed",
        function removedUserACB(firebaseData){
            model.deleteUser({user: firebaseData.key, pass: firebaseData.val()});

        }
    )

    firebase.database().ref(REF+"/savedDrinks/" + model.currentUser.user).on("child_added",
        function addedDishACB(firebaseData){
            if(!inDrinkList(+firebaseData.key)){
                getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                    model.saveDrink(drink[0]);
                })
            }
        }
    )

    firebase.database().ref(REF+"/savedDrinks/" + model.currentUser.user).on("child_removed",
        function removeDrinkACB(firebaseData){
            getDrinkDetails(+firebaseData.key).then(function removeDrinkFromListACB(drink){
                model.removeDrink(drink[0]);
            })
        }
    )

    firebase.database().ref(REF+"/ratings/" + model.currentUser.user).on("child_added",
        function addedRatingACB(firebaseData){
            getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                model.rateDrink(drink[0], firebaseData.val());
            })
    })

    firebase.database().ref(REF+"/ratings/" + model.currentUser.user).on("child_changed",
        function addedRatingACB(firebaseData){
            getDrinkDetails(+firebaseData.key).then(function addDrinkToListChangedInFirebaseACB(drink){
                model.rateDrink(drink[0], firebaseData.val());
            })
    })
}


function firebaseModelPromise(){

    function makeBigPromiseACB(){
        return new DrinkModel();
    }
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};