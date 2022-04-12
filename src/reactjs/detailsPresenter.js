import React from "react";
import DetailsView from "../views/detailsView.js";
import {getDrinkDetails} from "../drinkSource.js";

function DetailsPresenter(props) {
    const [currentDrink, setCurrentDrink] = React.useState();

    function observerACB() {
        setCurrentDrink(props.model.currentDrink);
    }

    function onCreateACB() {
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);

    return (
        <DetailsView currentDrink={currentDrink}></DetailsView>
    );
}

export default DetailsPresenter;