import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import {searchDrinks} from '../drinkSource.js';

window.React= React;

import SearchView from '../views/searchView';

class Search extends React.Component {
    const [error, setError] = React.useState();
    const [data, setData] = React.useState();
    // Initialize the promise. In order to not initiate a promise at each render, the promise needs to be returned by a callback. 
    const [promise, setPromise] = React.useState(function initializePromiseACB(){return searchDrinks({})});

    
    constructor(props) {
        super(props)
        this.state = {
            valid : "",
            currentView:"Search"
        }
    }
    render() { 
        const comp = this;
        const renderView = () => {
            if(comp.state.currentView=="Search") {
                return <SearchView drinks = {comp.props.model.drinks}> </SearchView>;
            }
            else {
                return <h1>Saved Drinks!</h1>;
            }
        };

        return (
            <ThemeProvider theme = {theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position='static'>
                        <Toolbar>
                            <Button sx={{m:2}} variant='outlined' color='secondary' onClick={() => {comp.state.currentView="Search";}}>Search</Button>
                            <Button sx={{m:2}} variant='outlined' color='secondary' onClick={() => {comp.state.currentView="Saved"; console.log(comp.state.currentView)}}>Saved Drinks</Button>
                        </Toolbar>
                    </AppBar>
                    {renderView()}
                </Box>
            </ThemeProvider>
        );
    }
}


export default Search;
