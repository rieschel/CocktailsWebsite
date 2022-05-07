import promiseNoData from "../views/promiseNoData";
// import SearchFormView from "../views/searchFormView";
import SearchResults from "../views/searchResults";
// import { searchDishes } from "../dishSource";
import SearchView from "../views/searchView";
import NavbarView from "../views/navbarView";

import { Alert } from "@mui/material";

import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";

import {
  searchDrinkByIngredient,
  searchDrinkByName,
  getDrinkDetails,
} from "../drinkSource";

import {
  updateFirebaseFromModel,
  updateModelFromFirebase,
} from "../firebaseModel";
import SavedPresenter from "../reactjs/SavedPresenter";
//import {getDishDetails} from "/src/dishSource.js";
//import DinnerModel from "/src/DinnerModel.js";

function SearchPresenter(props) {
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();
  const [s, setDrinkName] = React.useState();
  const [drinks, setDrinks] = React.useState([]);

  // Initialize the promise. In order to not initiate a promise at each render, the promise needs to be returned by a callback.
  const [promise, setPromise] = React.useState(function initializePromiseACB() {
    return searchDrinkByIngredient({ i: "" });
  });

  function promiseChangedACB() {
    setData(null);
    setError(null);
    let cancelled = false;

    function changedAgainACB() {
      cancelled = true;
    }

    if (promise) {
      promise
        .then(function saveDataACB(dt) {
          if (!cancelled) setData(dt);
        })
        .catch(function saveErrACB(er) {
          if (!cancelled) setError(er);
        });
    }
    /*   console.log("data: " + data)
        console.log("error: " + error) */
    return changedAgainACB; // promiseChangedACB will be called for the new value!
  }

  React.useEffect(promiseChangedACB, [promise]);

  function doIngrSearchACB(i) {
    setPromise(searchDrinkByIngredient({ i }));
  }

  function doDrinkSearchACB() {
    console.log("doing drink search with s: " + s);
    setPromise(searchDrinkByName({ s }));
  }

  function setDrinkNameACB(s) {
    setDrinkName(s);
  }

  function saveDrinkACB(drink) {
    props.model.saveDrink(drink);
  }

  function removeDrinkACB(drink) {
    props.model.removeDrink(drink);
  }

  //Ratings
  const [ratings, setRatings] = React.useState([]);

  function observerACB() {
    setRatings(props.model.ratings);
    setDrinks(props.model.drinks);
  }

  function onCreateACB() {
    observerACB();
    props.model.addObserver(observerACB);
    return function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    };
  }
  React.useEffect(onCreateACB, []);

  function setCurrentDrinkACB(drinkId) {
    props.model.setCurrentDrink(drinkId);
  }

  function setPreviousHashACB(hash) {
    props.model.setHash(hash);
  }

  function logoutACB() {
    props.model.setCurrentUser({ user: "", pass: "" });
  }

  function rateDrinkACB(drink, rating) {
    props.model.rateDrink(drink, rating);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavbarView
        currentUser={props.model.currentUser}
        onLogout={logoutACB}
      ></NavbarView>
      <SearchView
        currentUser={props.model.currentUser}
        drinkList={drinks}
        onSearch={doDrinkSearchACB}
        onTextInput={setDrinkNameACB}
        onFilter={doIngrSearchACB}
      >
        {" "}
      </SearchView>
      {promiseNoData({ promise, data, error }) || (
        <SearchResults
          onDrinkRate={rateDrinkACB}
          onDrinkRemove={removeDrinkACB}
          drinkList={drinks}
          searchResults={data}
          onCurrentDrink={setCurrentDrinkACB}
          onSaveDrink={saveDrinkACB}
          ratingList={ratings}
          onHashChange={setPreviousHashACB}
          currentUser={props.model.currentUser}
        />
      )}
    </Box>
  );
}

export default SearchPresenter;
