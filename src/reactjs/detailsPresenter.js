import React from "react";
import DetailsView from "../views/detailsView.js";
import {getDrinkDetails} from "../drinkSource.js";
import promiseNoData from "../views/promiseNoData";

function DetailsPresenter(props) {
    const [currentDrink, setCurrentDrink] = React.useState();
    const [detailsPromise, setPromise] = React.useState();
    const [promiseData, setData] = React.useState();
    const [promiseError, setError] = React.useState();
    const [ratings, setRatings] = React.useState([]);

    function observerACB() {
        setCurrentDrink(props.model.currentDrink);
        setData(props.model.currentDrinkPromiseState.data);
        setError(props.model.currentDrinkPromiseState.error);
        setPromise(props.model.currentDrinkPromiseState.promise);
        setRatings(props.model.ratings);
    }

    function onCreateACB() {
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);

    function saveDrinkACB(drink) {
        console.log("presenter saved")
        props.model.saveDrink(drink);
    }

    function rateDrinkACB(drink, rating) {
        props.model.rateDrink(drink, rating);
    }

    return promiseNoData(props.model.currentDrinkPromiseState)||(
        <DetailsView drinkData={promiseData} onSaveDrink={saveDrinkACB} onDrinkRate={rateDrinkACB} ratingList={ratings}></DetailsView>
    );
}

export default DetailsPresenter;