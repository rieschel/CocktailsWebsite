import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function NavbarView(props){

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

    return (
       
        <AppBar position='static'>
                        <Toolbar>
                            <Button onClick={changeToSearchACB} sx={{m:2}} variant='outlined' color='secondary'>Search</Button>
                            <Button onClick={changeToSavedACB} sx={{m:2}} variant='outlined' color='secondary'>Saved Drinks</Button>
                        </Toolbar>
        </AppBar>
        
    );

}

export default NavbarView;