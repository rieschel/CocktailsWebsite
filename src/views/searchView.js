import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';

import { Popover } from '@mui/material';
import CheckboxesGroup from './checkboxesGroup.js';

import { searchDrinks } from '../drinkSource.js';
import theme from "./theme.js";
/* import CheckboxesGroup from './checkboxes.js'; */

function SearchView(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonRef = React.useRef();
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

    function textInputACB(event){
        console.log("inside search view")
        console.log(event.target.value)
        props.onTextInput(event.target.value);
    }

    function filterACB(ingr){
        console.log("searchview ingr :" + ingr)
        props.onFilter(ingr);
    }

    return (
            <ThemeProvider theme = {theme}>
                <div>
                    <br></br>
                    <Typography align="center" variant="h3" sx={{m:2}}>Search for drinks</Typography>
                    <br></br>
                    <TextField 
                        onChange={textInputACB}
                        width="70%"
                        sx={{m:2}}
                        variant="outlined"
                        color="primary" focused
                        placeholder="Type something..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color = "primary"></SearchIcon>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Button sx={{p:1.5, m:2}} onClick={searchACB} variant="outlined" color="primary">Search</Button>
                    <Button
                        ref={buttonRef}
                        id={1} 
                        sx={{p:1.5, m:2}} 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<FilterAltIcon></FilterAltIcon>}
                        onClick={handleClick} 
                        >
                        Filter
                    </Button>
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
                        <CheckboxesGroup onFilter={filterACB} />
                    </Popover>    
                    {/* {props.drinks.map(renderDrinkCB)} */}

                </div>
            </ThemeProvider>
    );

}

export default SearchView;