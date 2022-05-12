import React from "react";
import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import promiseNoData from "../views/promiseNoData";
import SavedView from "../views/savedView.js";
import { Rating } from "@mui/material";
import NavbarView from "../views/navbarView.js";
import ShakeitupView from "../views/shakeitupView.js";
import RandomDrinkView from "../views/randomDrinkView.js";
import { generateRandomDrink } from "../drinkSource.js";
import { Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { Box } from "@mui/system";

function ShakeitupPresenter(props) {
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  const [promise, setPromise] = React.useState();

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
    return changedAgainACB;
  }

  React.useEffect(promiseChangedACB, [promise]);

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

  function doRandomDrinkSearchACB() {
    setPromise(generateRandomDrink());
  }
  function logoutACB() {
    props.model.setCurrentUser({ user: "", pass: "" });
  }

  function deleteUserACB() {
    props.model.deleteUser(props.model.currentUser);
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

  function setPreviousHashACB(hash) {
    props.model.setHash(hash);
  }

  function rateDrinkACB(drink, rating) {
    props.model.rateDrink(drink, rating);
  }

  function resetACB() {
    setPromise(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
      <NavbarView
        currentUser={props.model.currentUser}
        onLogout={logoutACB}
        onDeleteUser={deleteUserACB}
      ></NavbarView>
      <ThemeProvider theme={theme}>
      <Typography
        align="center"
        variant="h4"
        sx={{ m: 2, color: "black.main" }}
      >
        SHAKE IT UP!
      </Typography>
    </ThemeProvider>
      {(promiseNoData({ promise, data, error }) && (
        <Typography align="center">
          <Tooltip title="Click me to generate random drink">
            <img
              src="https://www.spiritshunters.com/wp-content/uploads/2020/09/how-to-use-a-shaker-.gif"
              height={"400"}
              onClick={doRandomDrinkSearchACB}
              style={{cursor: "pointer"}}
            ></img>
          </Tooltip>
        </Typography>
      )) || (
        <RandomDrinkView
          onReset={resetACB}
          onDrinkRate={rateDrinkACB}
          ratingList={ratings}
          onHashChange={setPreviousHashACB}
          onCurrentDrink={setCurrentDrinkACB}
          onDrinkRemove={removeDrinkACB}
          currentUser={props.model.currentUser}
          drinkList={drinks}
          onSaveDrink={saveDrinkACB}
          randomDrink={data}
        />
      )}
      </Box>
    </ThemeProvider>
  );
}

export default ShakeitupPresenter;
