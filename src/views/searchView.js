import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import { Popover } from '@mui/material';
import CheckboxesGroup from './filterMenu.js';
import Tooltip from '@mui/material/Tooltip';

import { searchDrinks } from '../drinkSource.js';
import theme from "./theme.js";

function SearchView(props) {
    /* console.log("Searchview value of alc "+ props.alc) */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonRef = React.useRef();

   /*  var element = document.getElementById("root");
    element.style.backgroundColor = "#F9FAF0"; */

    function handleClick() {
        setAnchorEl(buttonRef.current);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    function searchACB(){
        console.log("sw on search")
        props.onSearch();
    }

    function filterACB(ingr){
        console.log("searchview ingr :" + ingr)
        props.onFilter(ingr);
    }

    function textInputACB(event){
        /* console.log("inside search view") */
        console.log(event.target.value)
        props.onTextInput(event.target.value);
    }
    function handleKeyACB(e){
        if (e.key === 'Enter') {
            props.onSearch();
            //alert(e.target.value);
        }
    }

    return (
            <ThemeProvider theme = {theme}>
                <Box sx={{color:'background.main'}}>
                    <br></br>
                    <Typography align="center" variant="h4" sx={{m:2, color:'black.main'}}>Search for drinks</Typography>
                    <br></br>
                    <Tooltip title="Search drinks by name">
                        <TextField 
                            onChange={textInputACB}
                            onKeyPress={handleKeyACB}
                            //width=
                            sx={{m:0, top:15, width:0.5}}
                            variant="outlined"
                            color="black"
                            placeholder="Type something..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color = "black"></SearchIcon>
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>
                    </Tooltip>
                    <Tooltip title="Filter drinks by ingredients">
                        <Button
                            color="black"
                            ref={buttonRef}
                            id={1} 
                            sx={{p:1.5, m:2, paddingTop:1.75, paddingBottom:1.75}} 
                            variant="outlined" 
                            startIcon={<FilterAltIcon></FilterAltIcon>}
                            onClick={handleClick} 
                            >
                            Filter
                        </Button>
                    </Tooltip>
                    <Popover
                        sx={{height: 700 ,maxHeight: 1000 , width:700}}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                        }}
                        transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                        }}
                    >
                        <CheckboxesGroup onFilter={filterACB} onClose={handleClose} />
                    </Popover>    
                    {/* {props.drinks.map(renderDrinkCB)} */}

                </Box>
            </ThemeProvider>
    );

}

export default SearchView;