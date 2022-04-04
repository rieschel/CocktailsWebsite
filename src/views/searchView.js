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

import theme from "./theme.js";

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

    function renderDrinkCB(drink) { 
        return (
            <ThemeProvider theme = {theme}>
                <Typography sx={{m:2}} variant="h6" color="primary">{drink}</Typography>
            </ThemeProvider>
        );
    }

    function handleFilterACB(){
        console.log("Searchview handled filterclick");
        props.onFilterClick();
    }

    return (
            <ThemeProvider theme = {theme}>
                <Box sx={{ bgcolor: 'background.default', width: '100%', height: '100%', p:2}}>
                    <br></br>
                    <Typography align="center" variant="h2" color="primary">ShakerItUp!</Typography>
                    <br></br>
                    <TextField 
                        width="70%"
                        sx={{m:2}}
                        variant="outlined"
                        color="primary" focused
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color = "primary"></SearchIcon>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <Button sx={{p:1.5, m:2}} variant="outlined" color="primary">Search</Button>
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
                    {/* <Button  sx={{p:1.5, m:2}} aria-describedby={id} variant="outlined" color="primary" onClick={handleToggle}>
                        Open Popover
                    </Button> */}
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
                        <CheckboxesGroup/>
                        {/* <Typography>The content of the Popover.</Typography> */}
                    </Popover>
                           
                    {props.drinks.map(renderDrinkCB)}
                </Box>
            </ThemeProvider>
    );

}

export default SearchView;