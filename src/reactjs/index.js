import React from 'react';
import ReactDOM from 'react-dom';
import DrinkModel from '../DrinkModel.js';

window.React= React;

const drinkModel = new DrinkModel();
const App=require("../views/app.js").default;

ReactDOM.render(<App model = {drinkModel}/>, document.getElementById("root"));
