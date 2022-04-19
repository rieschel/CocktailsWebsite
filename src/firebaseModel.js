import firebaseConfig from "/src/firebaseConfig.js";
import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/auth';
import 'firebase/firestore';
import {getDrinkDetails} from "./drinkSource.js";
import DrinkModel from "/src/DrinkModel.js";

firebase.initializeApp(firebaseConfig);  
const REF="drinksModel";

// function checkUser(user){
//     console.log("inside check user")
//     let validUser = false;
//     firebase.database().ref(REF+"/users").on("value",
//         function getUsersACB(firebaseData){
//             console.log(firebaseData.val())
//             console.log(Object.keys(firebaseData.val()))
//             if(Object.keys(firebaseData.val()).includes(user.user) && Object.values(firebaseData.val()).includes(user.pass)){
//                 console.log("valid user")
//                 validUser = true;
//                 return true;
//             }else{
//                 return false
//             }
//     })
// }

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
                console.log(payload.addUser)
                console.log("inside updating firebase")
                firebase.database().ref(REF+"/users/" + payload.addUser.user).set(payload.addUser.pass)
            }
        } 
    }
    model.addObserver(observerACB);
}

function updateModelFromFirebase(model){
    console.log("updating")

    function inDrinkList(drinkID){
        function inDrinkListCB(drink){
            return drink.idDrink == drinkID;
        }   
        return (model.drinks.filter(inDrinkListCB).length > 0)
    }

    firebase.database().ref(REF+"/users").on("child_added",
        function addedUserACB(firebaseData){
            model.addUser({user: firebaseData.key, pass: firebaseData.val()})
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
            console.log("inside remove")
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

    function makeBigPromiseACB(firebaseData){
        console.log(firebaseData)
        // function makeDrinkPromiseCB(dishId){
        //     return getDrinkDetails(dishId);
        // }

        // function createModelACB(drinkArray){
        //     return new DrinkModel(drinkArray);
        // }

        // if(!firebaseData.val().savedDrinks.test){
        //     return new DrinkModel();
        // }else{
        //     const drinkPromiseArray= Object.keys(firebaseData.val().savedDrinks.test).map(makeDrinkPromiseCB);
        //     return Promise.all(drinkPromiseArray).then(createModelACB)
        // }
        return new DrinkModel();
    }

    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};