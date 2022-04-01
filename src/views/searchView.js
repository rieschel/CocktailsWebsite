import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

import { searchDrinks } from '../drinkSource.js';
import theme from "./theme.js";
import CheckboxesGroup from './checkboxes.js';

function SearchView(props) {

    /* function renderDrink2(){
        console.log("test")s
        console.log(searchDrinks())
        return(
            <div>{searchDrinks()['drinks'][0]['strDrink']}</div>
        )
    } */

    function searchACB(){
        props.onSearch();
    }

    function textInputACB(event){
        console.log("inside search view")
        console.log(event.target.value)
        props.onTextInput(event.target.value);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {
        setAnchorEl(null);
        searchACB();
    };
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

    return (
            <ThemeProvider theme = {theme}>
                <Box sx={{ width: '80%', height: '100%', p:2}}>
                    <br></br>
                    <Typography align="center" variant="h2" color="primary">ShakerItUp!</Typography>
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
                    <Button aria-describedby={id} onClick={handleClick} sx={{p:1.5, m:2}} variant="outlined" color="primary" startIcon={<FilterAltIcon></FilterAltIcon>}>Filter</Button>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrgin={{vertical:'bottom', horizontal:'left',}}>
                        <CheckboxesGroup onFilterInput={props.onTextInput}></CheckboxesGroup>
                    </Popover>
                </Box>
            </ThemeProvider>
    );

}

export default SearchView;