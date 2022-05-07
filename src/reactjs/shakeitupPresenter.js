import React from "react";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import promiseNoData from "../views/promiseNoData";
import SavedView from "../views/savedView.js";
import { Rating } from "@mui/material";
import NavbarView from "../views/navbarView.js";
import ShakeitupView from "../views/shakeitupView.js";
import RandomDrinkView from "../views/randomDrinkView.js";
import { generateRandomDrink } from "../drinkSource.js";

function ShakeitupPresenter(props) {

    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    
    const [promise, setPromise] = React.useState(function initializePromiseACB(){return generateRandomDrink()});
   
    function promiseChangedACB(){ 
        setData(null); 
        setError(null); 
        let cancelled = false;

        function changedAgainACB(){ 
            cancelled= true; 
        }  
            
        if(promise){
            promise.then(function saveDataACB(dt){  if(!cancelled) setData(dt);}).catch(function saveErrACB(er){ if(!cancelled)setError(er)});
            
        }
        return changedAgainACB;
    }

    React.useEffect(promiseChangedACB , [promise] );

    function doRandomDrinkSearchACB(){
        console.log("inside presenter")
        setPromise(generateRandomDrink());
        console.log("completed promise")
    }
    function logoutACB(){
        props.model.setCurrentUser({user: "", pass: ""});
    }

    function saveDrinkACB(drink) {
        props.model.saveDrink(drink);
    }

    function removeDrinkACB(drink) {
        props.model.removeDrink(drink);
    }

    function setCurrentDrinkACB(drinkId) {
        props.model.setCurrentDrink(drinkId);
    }

    function setPreviousHashACB(hash){
        props.model.setHash(hash);
    }

    function rateDrinkACB(drink, rating) {
        props.model.rateDrink(drink, rating);
    }

    return (
        <ThemeProvider theme={theme}>
            <NavbarView currentUser={props.model.currentUser} onLogout={logoutACB}></NavbarView>
            <ShakeitupView onSearch={doRandomDrinkSearchACB}></ShakeitupView>
            {promiseNoData({promise, data, error}) || <RandomDrinkView onDrinkRate={rateDrinkACB} ratingList={props.model.ratings} onHashChange={setPreviousHashACB} onCurrentDrink={setCurrentDrinkACB} onDrinkRemove={removeDrinkACB} currentUser={props.model.currentUser} drinkList={props.model.drinks} onSaveDrink={saveDrinkACB} randomDrink={data}/>}
        </ThemeProvider>
    );

}

export default ShakeitupPresenter;