import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';
import theme from "../views/theme.js";
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';


function NavbarView(props){

    //console.log("Current user: " + props.currentUser)

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

    function changeToShakeitupACB(event){
        if(window.location.hash != "#shakeitup"){
            window.location.hash = "#shakeitup";
        }
    }

    function logoutACB(){
        props.onLogout();
        window.location.hash = "#login"
    }

    function loginACB() {
        window.location.hash = "#login"
    }

    function getButtonVariant(page) {
        if(window.location.hash == page) {
            return "contained";
        }
        else {
            return "outlined";
        }
    }

    function savedDrinksACB(){
        if (!props.currentUser.user){
            return;
        }
        else {
            return <Button onClick={changeToSavedACB} sx={{m:2}} variant={getButtonVariant("#saved_drinks")} color="secondary" startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}>Saved Drinks</Button>;
        }
        // return <Button onClick={changeToSavedACB} sx={{m:2}} variant={getButtonVariant("#saved_drinks")} color="secondary">Saved Drinks</Button>;
    }

    function getButton() {
        if(!props.currentUser.user) {
            return <Button align="right" onClick={loginACB} variant="outlined" color="secondary" startIcon={<LoginIcon></LoginIcon>}>Login</Button>;
        }
        else {
            return <Button align="right" onClick={logoutACB} sx={{m:2}} variant="outlined" color="secondary" startIcon={<LogoutIcon></LogoutIcon>}>Logout</Button>;
        }
    }

    return (
       <ThemeProvider theme={theme} >
           <Box sx={{flexGrow: 1}}>
                <AppBar position='static' color="primary">
                    <Toolbar>
                        <Typography variant="h6" sx={{m:2}} onClick={changeToShakeitupACB}>ShakeItUp!</Typography>
                        <Button onClick={changeToSearchACB} sx={{m:2}} variant={getButtonVariant("#search")} color="secondary" startIcon={<SearchIcon></SearchIcon>}>Search</Button>
                        {savedDrinksACB()}
                        <Box sx={{flexGrow: 1}}></Box>
                        {getButton()}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
        
    );
}

export default NavbarView;