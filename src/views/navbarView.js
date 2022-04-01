import promiseNoData from "./promiseNoData";
// import SearchFormView from "../views/searchFormView";
import SearchResults from "./searchResults";
// import { searchDishes } from "../dishSource";
import { searchDrinks } from "../drinkSource";
import SearchView from "./searchView";
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import theme from "./theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { searchDrinkByIngredient } from "../drinkSource";


function NavbarView(props){

    function changePageACB(page){
        console.log("changedPageACB passed");
        props.onChangePage();
    }

    return (
       
                <AppBar position='static'>
                                <Toolbar>
                                    <Button onClick={changePageACB} value = "search" sx={{m:2}} variant='outlined' color='secondary'>Search</Button>
                                    <Button onClick={changePageACB} value = "saved drinks" sx={{m:2}} variant='outlined' color='secondary'>Saved Drinks</Button>
                                </Toolbar>
                </AppBar>
        
    );

}

export default NavbarView;