
import promiseNoData from "../views/promiseNoData";
// import SearchFormView from "../views/searchFormView";
import SearchResults from "../views/searchResults";
// import { searchDishes } from "../dishSource";
import { searchDrinks } from "../drinkSource";
import SearchView from "../views/searchView";

import { Alert } from '@mui/material';

import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { searchDrinkByIngredient, searchDrinkByName } from "../drinkSource";


function SearchPresenter(props){
    //const [i, setIngredient] = React.useState("gin,rum");
    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    const [s, setDrinkName] = React.useState();
    /* const i = "gin"; */

    //console.log("SearchPresenter value of alc "+ props.model.alc)
    
    // Initialize the promise. In order to not initiate a promise at each render, the promise needs to be returned by a callback. 
    const [promise, setPromise] = React.useState(function initializePromiseACB(){return searchDrinkByIngredient({i:"gin"})});
   
    function promiseChangedACB(){ 
        setData(null); 
        setError(null); 
        let cancelled = false;

        function changedAgainACB(){ 
            cancelled= true; 
        }  
            
        if(promise){
            promise.then(function saveDataACB(dt){  if(!cancelled) setData(dt);}).catch(function saveErrACB(er){ if(!cancelled)setError(er)});
        }
        
        return changedAgainACB;  // promiseChangedACB will be called for the new value!
    }

    React.useEffect(promiseChangedACB , [promise] );

    function doIngrSearchACB(i){
        /* console.log("SP ing " +i);
        console.log("SP i " + i) */
        setPromise(searchDrinkByIngredient({i}));
    }

    function doDrinkSearchACB(){
        setPromise(searchDrinkByName({s}));
    }

    function setIngredientACB(i){
        //console.log("setting ingredient")
        //console.log("trimmed " + i.trim());
        setIngredient(i);
      
    }

    function setDrinkNameACB(s){
        /* console.log("setting drink name") */
        //console.log("trimmed " + i.trim());
        setDrinkName(s); 
      
    }


    function saveDrinkACB(drink) {
        console.log("presenter saved");
        props.model.saveDrink(drink);
    }

        
    return (
        <ThemeProvider theme = {theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Button sx={{m:2}} variant='outlined' color='secondary'>Search</Button>
                        <Button sx={{m:2}} variant='outlined' color='secondary'>Saved Drinks</Button>
                    </Toolbar>
                </AppBar>
                {promiseNoData({promise, data, error}) ||<SearchView drinks = {props.model.drinks} onSearch={doDrinkSearchACB}  onTextInput={setDrinkNameACB} onFilter={doIngrSearchACB} /* alc={props.model.alc} garnish={props.model.garnish} */> </SearchView>
                  || <SearchResults searchResults={data} onSaveDrink={saveDrinkACB}/>}
                
            </Box>
        </ThemeProvider>
    );


}

export default SearchPresenter;