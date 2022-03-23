import promiseNoData from "../views/promiseNoData";
// import SearchFormView from "../views/searchFormView";
import SearchResults from "../views/searchResults";
// import { searchDishes } from "../dishSource";
import { searchDrinks } from "../drinkSource";
import SearchView from "../views/searchView";
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

// Component state:
// Basic principle: Component state changes => component re-renders (updates)

// SearchPresenter does not need to be an observer, because it will only use component state, not application state.

function SearchPresenter(props){
    const [ingredient, setIngrediet] = React.useState();
    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    // Initialize the promise. In order to not initiate a promise at each render, the promise needs to be returned by a callback. 
    const [promise, setPromise] = React.useState(function initializePromiseACB(){return searchDrinks({})});

    // To avoid race conditions in React, you need to use an effect that triggers every time the promise changes in state. 
    // If the promise changes again (danger for race condition) the effect cleanup code will be invoked.
    // The cleanup code can mark the promise as cancelled so it does not save data (or error) in component state, thus avoiding the race condition.
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

    function doSearchACB(){
        //setPromise(searchDishes({type, query}));
        setPromise(searchDrinks({ingredient}));
    }

    function setIngredientACB(ingredient){
        //console.log("setting type ", type);
        setIngredient(ingredient);
    }

    /*function setCurrentDishACB(dish){
        props.model.setCurrentDish(dish.id)
    }*/
        
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Button sx={{m:2}} variant='outlined' color='secondary' onClick={() => {comp.state.currentView="Search";}}>Search</Button>
                        <Button sx={{m:2}} variant='outlined' color='secondary' onClick={() => {comp.state.currentView="Saved"; console.log(comp.state.currentView)}}>Saved Drinks</Button>
                    </Toolbar>
                </AppBar>
                <SearchView drinks = {props.model.drinks} onSearch={doSearchACB}  > </SearchView>
                {promiseNoData({promise, data, error}) ||  <SearchResults searchResults={data}/>}
            </Box>
    );


}

export default SearchPresenter;