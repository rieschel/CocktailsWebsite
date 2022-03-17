import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';

import theme from "./theme.js";

function SearchView(props) {

    function renderDrinkCB(drink) { 
        return (
            <ThemeProvider theme = {theme}>
                <Typography sx={{m:2}} variant="h6" color="primary">{drink}</Typography>
            </ThemeProvider>
        );
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
                    <Button sx={{p:1.5, m:2}} variant="outlined" color="primary" startIcon={<FilterAltIcon></FilterAltIcon>}>Filter</Button>
                    {props.drinks.map(renderDrinkCB)}
                </Box>
            </ThemeProvider>
    );

}

export default SearchView;