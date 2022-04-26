import React from "react";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

import SavedView from "../views/savedView.js";
import { Rating } from "@mui/material";
import NavbarView from "../views/navbarView.js";

function SavedPresenter(props) {

    const [drinks, setDrinks] = React.useState([]);
    const [ratings, setRatings] = React.useState([]);

    function observerACB() {
        setDrinks(props.model.drinks);
        setRatings(props.model.ratings);
    }

    function onCreateACB() {
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);

    function removeDrinkACB(drink) {
        props.model.removeDrink(drink);
    }

    function setCurrentDrinkACB(drinkId) {
        props.model.setCurrentDrink(drinkId);
    }

    function setPreviousHashACB(hash){
        props.model.setHash(hash);
    }

    function logoutACB(){
        props.model.setCurrentUser({user: "", pass: ""});
    }

    function rateDrinkACB(drink, rating) {
        props.model.rateDrink(drink, rating);
    }

    return (
        <ThemeProvider theme={theme}>
            <NavbarView currentUser={props.model.currentUser} onLogout={logoutACB}></NavbarView>
            <SavedView onDrinkRate={rateDrinkACB} drinkList={drinks} onDrinkRemove={removeDrinkACB} onCurrentDrink={setCurrentDrinkACB} ratingList={ratings} onHashChange={setPreviousHashACB}></SavedView>
        </ThemeProvider>
    );

}

export default SavedPresenter;