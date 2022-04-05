
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
import { searchDrinkByIngredient } from "../drinkSource";


function SearchPresenter(props){
    const [i, setIngredient] = React.useState("gin");
    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    
    // Initialize the promise. In order to not initiate a promise at each render, the promise needs to be returned by a callback. 
    const [promise, setPromise] = React.useState(function initializePromiseACB(){return searchDrinkByIngredient({i})});
   
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
        setPromise(searchDrinkByIngredient({i}));
    }

    function setIngredientACB(i){
        console.log("setting ingredient")
        //console.log("trimmed " + i.trim());
        setIngredient(i);
      
    }

    function filterACB(){
        console.log("filter in presenter");
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
                <SearchView drinks = {props.model.drinks} onSearch={doSearchACB}  onTextInput={setIngredientACB} onFilterInput={filterACB}> </SearchView>
                {promiseNoData({promise, data, error}) ||  <SearchResults searchResults={data} onSaveDrink={saveDrinkACB}/>}
                
            </Box>
        </ThemeProvider>
    );


}

export default SearchPresenter;