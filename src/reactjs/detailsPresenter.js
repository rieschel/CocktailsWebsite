import React from "react";
import DetailsView from "../views/detailsView.js";
import {getDrinkDetails} from "../drinkSource.js";
import promiseNoData from "../views/promiseNoData";

function DetailsPresenter(props) {
    const [currentDrink, setCurrentDrink] = React.useState();
    const [detailsPromise, setPromise] = React.useState();
    const [promiseData, setData] = React.useState();
    const [promiseError, setError] = React.useState();

    function observerACB() {
        setCurrentDrink(props.model.currentDrink);
        setData(props.model.currentDrinkPromiseState.data);
        setError(props.model.currentDrinkPromiseState.error);
        setPromise(props.model.currentDrinkPromiseState.promise)
    }

    function onCreateACB() {
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);
    console.log(promiseData);
    return promiseNoData(props.model.currentDrinkPromiseState)||(
        <DetailsView drinkData={promiseData}></DetailsView>
    );
}

export default DetailsPresenter;