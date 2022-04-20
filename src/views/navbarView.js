import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';
import theme from "../views/theme.js";
import { Typography } from '@mui/material';

function NavbarView(props){

    console.log("Current user: " + props.currentUser)

    function changeToSearchACB(event){
        if(window.location.hash != "#search"){
            window.location.hash = "#search";
        }
    }

    function changeToSavedACB(event){
        if(window.location.hash != "#saved_drinks"){
            window.location.hash = "#saved_drinks";
        }
    }

    function logoutACB(){
        props.onLogout();
        window.location.hash = "#login"
    }

    function savedDrinksACB(){
        //if (props.currenUser){
            console.log("2Current user: " + props.currentUser)
            return(
                <Button onClick={changeToSavedACB} sx={{m:2}} variant='outlined' color="secondary">Saved Drinks</Button>
            )
        //}
    }

    return (
       <ThemeProvider theme={theme}>
            <AppBar position='static' color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{m:2}} onClick={changeToSearchACB}>ShakeItUp!</Typography>
                    <Button onClick={changeToSearchACB} sx={{m:2}} variant='outlined' color="secondary">Search</Button>
                    {savedDrinksACB()}
                    <Button onClick={logoutACB} sx={{m:2}} variant='outlined' color="secondary">Logout</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
        
    );
}

export default NavbarView;