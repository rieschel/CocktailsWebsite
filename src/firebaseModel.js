import firebaseConfig from "/src/firebaseConfig.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, onValue, onChildRemoved} from "firebase/database";
import {ref, set, get, child } from "firebase/database";
import {getDrinkDetails} from "./drinkSource.js";
import DrinkModel from "/src/DrinkModel.js";

firebase.initializeApp(firebaseConfig);  
const REF="drinksModel";

function updateFirebaseFromModel(model){
    function observerACB(payload){
        if (payload) {
            const db = getDatabase();
            if(payload.addDrink){
                set(ref(db, REF + "/savedDrinks/" + payload.addDrink.idDrink), payload.addDrink.strDrink);
            }
            else if(payload.rateDrink){
                set(ref(db, REF + "/ratings/" + payload.rateDrink.d), payload.rateDrink.r);
            }
            else if(payload.removeDrink){
                set(ref(db, REF + "/savedDrinks/" + payload.removeDrink.idDrink), null);
            }
        }
    }
    model.addObserver(observerACB);
}

function updateModelFromFirebase(model){

    console.log("inside updateModelFromFirebase")

    function inDrinkList(drinkID){
        function inDrinkListCB(drink){
            return drink.idDrink == drinkID;
        }   
        return (model.drinks.filter(inDrinkListCB).length > 0)
    }

    function addToDrinkListCB(drinkid){
        //kolla innan om den redan finns i listan eller inte

        if(!inDrinkList(drinkid)){
            getDrinkDetails(drinkid).then(function addDishToMenuChangedInFirebaseACB(drink){
                model.saveDrink(drink[0]);
            })
        }
    }

    function removeFromDrinkList(drinksLeft){
        //används inte just nu, kolla om det finns bättre sätt att lösa detta på
        
        console.log(drinksLeft)

        function inDrinksLeftList(drink){
            function inDrinkListCB(id){
                return drink.id == id;
            }   
            return (drinksLeft.filter(inDrinkListCB).length > 0)
        }

        function removeFromDrinkListCB(drink){
            if(!inDrinksLeftList(drink)){
                model.removeDrink(drink);
            }
        }

        model.drinks.map(removeFromDrinkListCB)
    }

    const db = getDatabase();
    onValue(ref(db, REF + "/savedDrinks"),
        function addedDrinkACB(firebaseData){
            Object.keys(firebaseData.val()).map(addToDrinkListCB)
            /*if(firebaseData.val() && (Object.keys(firebaseData.val()).length != model.drinks.length) && model.drinks.length != 0){
                console.log("testing")
                removeFromDrinkList(Object.keys(firebaseData.val()));
            }else if (firebaseData.val()){
                Object.keys(firebaseData.val()).map(addToDrinkListCB)
            }*/
            //removeFromDrinkList(Object.keys(firebaseData.val()));
                //Object.keys(firebaseData.val()).map(removeFromDrinkListCB)
            
        }
    )

    function addToRatingListCB(ratingAndID){

        getDrinkDetails(ratingAndID[0]).then(function addDishToMenuChangedInFirebaseACB(drink){
            model.rateDrink(drink[0], ratingAndID[1]);
        })
    }

    onValue(ref(db, REF + "/ratings"),
        function addedRatingACB(firebaseData){
            Object.entries(firebaseData.val()).map(addToRatingListCB)
        })

    
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

        if(!firebaseData.val().savedDrinks){
            return new DrinkModel();
        }else{
            const drinkPromiseArray= Object.keys(firebaseData.val().savedDrinks).map(makeDrinkPromiseCB);
            return Promise.all(drinkPromiseArray).then(createModelACB)
        }
    }

    const dbRef = ref(getDatabase());
    return get(child(dbRef, REF)).then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};