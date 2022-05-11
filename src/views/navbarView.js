import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';
import theme from "../views/theme.js";
import { getPopoverUtilityClass, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Popover } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from "@mui/material/InputAdornment";


function NavbarView(props){

    //console.log("Current user: " + props.currentUser)

    // popover 1
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const buttonRef1 = React.useRef();
    function handleClick1() {
        setAnchorEl1(buttonRef1.current);
    }

    function handleClose1() {
        setAnchorEl1(null);
    }

    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? "simple-popover" : undefined;

    // dialog 1

    const [open2, setOpen2] = React.useState(false);
    function handleClick2() {
        setOpen2(true);
    }
    function handleClose2() {
        setOpen2(false);
    }

    // dialog 2
    const [open3, setOpen3] = React.useState(false);
    function handleClick3() { setOpen3(true) }
    function handleClose3() { setOpen3(false) }

    // Functions
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
        window.location.hash = "#login";
    }

    function deleteAccountACB() {
        props.onDeleteUser();
        window.location.hash ="#login";
    }

    function loginACB() {
        window.location.hash = "#login";
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

    function getPopover() {
        if(!props.currentUser.user) {
            return <Button onClick={loginACB} sx={{m:2}} variant="outlined" color="primary" startIcon={<LoginIcon></LoginIcon>}>Login</Button>;
        }
        else {
            return (
                <div>
                    <Button onClick={logoutACB} sx={{m:2}} variant="outlined" color="primary" startIcon={<LogoutIcon></LogoutIcon>}>Logout</Button>
                    <br></br>
                    <Button onClick={handleClick3} sx={{m:2}} variant="outlined" color="primary" startIcon={<DeleteIcon></DeleteIcon>}>Delete Account</Button>
                    <Dialog open={open3} onClose={handleClose3}>
                        <DialogContent>
                            <DialogContentText align="center" sx={{m:2}}>Are you sure?</DialogContentText>
                            <DialogActions>
                                <Button onClick={deleteAccountACB} align="left">Yes</Button>
                                <Button onClick={handleClose3} align="right">No</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        }
    }


    return (
       <ThemeProvider theme={theme} >
           <Box sx={{flexGrow: 1}}>
                <AppBar position='static' color="primary">
                    <Toolbar>
                        {/* <Typography variant="h6" sx={{m:2}} onClick={changeToShakeitupACB}>ShakeItUp!</Typography> */}
                        <Button onClick={changeToShakeitupACB} sx={{m:2}} variant={getButtonVariant("#shakeitup")} color="secondary">Shake it up!</Button>
                        <Button onClick={changeToSearchACB} sx={{m:2}} variant={getButtonVariant("#search")} color="secondary" startIcon={<SearchIcon></SearchIcon>}>Search</Button>
                        {savedDrinksACB()}
                        <Box sx={{flexGrow: 1}}></Box>
                        <Tooltip title="Get more info">
                            <IconButton
                                color="secondary"
                                id={2}
                                onClick={handleClick2}
                            >
                                <InfoIcon></InfoIcon>
                            </IconButton>
                        </Tooltip>
                        <Dialog open={open2} onClose={handleClose2}>
                            <DialogTitle variant="h4"><InfoIcon color="primary" sx={{mr:1}}></InfoIcon>Info</DialogTitle>
                            <DialogContent>
                                <DialogContentText maxWidth="500px">
                                    With ShakeItUp you can find your new favourite drinks.
                                    <br></br><br></br>
                                    Search for drinks by name or filter drinks by ingredients.
                                    <br></br><br></br>
                                    Create an account to save and rate drinks.
                                    <br></br><br></br>
                                    Don't know how to ShakeItUp? Here's how!
                                    <br></br><br></br>
                                    <iframe width="400" height="225" src="https://www.youtube.com/embed/d0OYR5t8xZY?start=7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                        <Tooltip title="Manage account">
                            <IconButton s
                                color="secondary"
                                ref={buttonRef1}
                                id={1}
                                onClick={handleClick1} 
                            >
                                <AccountCircleIcon></AccountCircleIcon>
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id={id1}
                            open={open1}
                            anchorEl={anchorEl1}
                            onClose={handleClose1}
                            anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                            }}
                            transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                            }}
                        >
                            {getPopover()}
                        </Popover>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
        
    );
}

export default NavbarView;