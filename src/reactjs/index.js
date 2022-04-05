import React from 'react';
import ReactDOM from 'react-dom';
import DrinkModel from '../DrinkModel.js';

window.React= React;

const drinkModel = new DrinkModel();
const App=require("../views/app.js").default;

ReactDOM.render(<App model = {drinkModel}/>, document.getElementById("root"));

// /*import React from 'react';
// import ReactDOM from 'react-dom';
// import DrinkModel from '../DrinkModel.js';
// import firebase from "firebase/compat/app";
// import "firebase/database";

// window.React= React;

// /*const drinkModel = new DrinkModel();
// const App=require("../views/app.js").default;

// ReactDOM.render(<App model = {drinkModel}/>, document.getElementById("root"));*/


// // needed for plugging in a "mock" firebase for testing. In the project simply import firebase where needed, as above
// window.firebase=firebase;

// // uncomment when you implemented firebaseModel in TW3.5. require() is needed, to use window.firebase above
// const {firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase}=require("/src/firebaseModel.js");

// // require() because the lab App loads React/Vue presenters
// const App=require("/src/views/app.js").default;

// // import DinnerModel, navigation,
// import promiseNoData from "../views/promiseNoData";

// // import promiseNoData, you will need it during resolve of firebaseModelPromise

// // render a ReactRoot that resolves firebaseModelPromise, then displays the App (see tw/tw3.5-react.js)
// //import "./teacherFirebase.js";

// // make webpack load the file only if it exists
// const X= TEST_PREFIX;

// const DinnerModel=require("/src/"+X+"DrinkModel.js").default;
// //const App=require("/src/views/"+X+"app.js").default;

// const bigPromise= firebaseModelPromise(); 
// let firebaseModel;

// try{
//     firebaseModel=require("/src/"+X+"firebaseModel.js");
//     if(!firebaseModel.updateFirebaseFromModel)
//         throw "not found";
//     //require("/src/views/"+X+"navigation.js");
// }catch(e){
//     render(<div>
//              Please write /src/firebaseModel.js and updateFirebaseFromModel
//            </div>,  document.getElementById('root'));
// }
// if(firebaseModel && firebaseModel.updateFirebaseFromModel){
//     const {updateFirebaseFromModel, updateModelFromFirebase}=firebaseModel;
//     function ReactRoot(){
//         const [model, setModel] = React.useState();
//         const [error, setError] = React.useState();

//         React.useEffect(function onStartACB(){
//             bigPromise.then(function saveResultACB(result){
//                 setModel(result);
//                 updateFirebaseFromModel(result);
//                 if(updateModelFromFirebase) 
//                     updateModelFromFirebase(result);
//             }).catch(function saveErrorACB(error){setError(error)})
//         }, []);
//         return  promiseNoData({promise: bigPromise, data: model, error: error}) || <App model={model}/>;
//     }
    
//     render(
//         <ReactRoot/>,
//         document.getElementById('root')
//     );       
// }

