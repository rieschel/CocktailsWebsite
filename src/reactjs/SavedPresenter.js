import React from "react";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

import SavedView from "../views/savedView.js";
import { Rating } from "@mui/material";

function SavedPresenter(props) {

    const [drinks, setDrinks] = React.useState([]);
    const [ratings, setRatings] = React.useState([]);

    function observerACB() {
        console.log("in observerACB");
        setDrinks(props.model.drinks);
        setRatings(props.model.ratings);
    }

    function onCreateACB() {
        console.log("in onCreateACB");
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);

    function removeDrinkACB(drink) {
        props.model.removeDrink(drink);
    }

    function rateDrinkACB(drink, rating) {
        props.model.rateDrink(drink, rating);
    }

    return (
        <ThemeProvider theme={theme}>
            <SavedView drinkList={drinks} onDrinkRemove={removeDrinkACB} onDrinkRate={rateDrinkACB} ratingList={ratings}></SavedView>
        </ThemeProvider>
    );

}

export default SavedPresenter;