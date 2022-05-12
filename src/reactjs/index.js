import React from "react";
import { render } from "react-dom";

window.React = React;

import firebase from "firebase/app";
import "firebase/database";

window.firebase = firebase;

const {
  firebaseModelPromise,
  updateFirebaseFromModel,
  updateModelFromFirebase,
} = require("/src/firebaseModel.js");
const App = require("/src/views/app.js").default;

import promiseNoData from "../views/promiseNoData";

const DrinkModel = require("/src/DrinkModel.js").default;

const bigPromise = firebaseModelPromise();
let firebaseModel;

try {
  firebaseModel = require("/src/firebaseModel.js");
  if (!firebaseModel.updateFirebaseFromModel) throw "not found";
  require("/src/navigation.js");
} catch (e) {
  render(
    <div>Please write /src/firebaseModel.js and updateFirebaseFromModel</div>,
    document.getElementById("root")
  );
}


if (firebaseModel && firebaseModel.updateFirebaseFromModel) {
  const { updateFirebaseFromModel, updateModelFromFirebase } = firebaseModel;


  function ReactRoot() {
    const [model, setModel] = React.useState();
    const [error, setError] = React.useState();

    React.useEffect(function onStartACB() {
      bigPromise
        .then(function saveResultACB(result) {
          setModel(result);
          updateFirebaseFromModel(result);
          if (updateModelFromFirebase) updateModelFromFirebase(result);
        })
        .catch(function saveErrorACB(error) {
          setError(error);
        });
    }, []);

    return (
      promiseNoData({ promise: bigPromise, data: model, error: error }) || (
        <App model={model} />
      )
    );
  }

  render(<ReactRoot />, document.getElementById("root"));
}
