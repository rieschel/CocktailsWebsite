import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

function SavedView(props) {

    function renderDrinkCB(drink) { 
        console.log("render saved drink");
        return (
            <ThemeProvider theme = {theme}>
                <Typography key = {drink['idDrink']} sx={{m:2}}>{drink['strDrink']}</Typography>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box align="right" width="300px">
                <Typography sx={{m:2}} variant="h6">Saved Drinks</Typography>
                {props.drinks.map(renderDrinkCB)}
            </Box>
        </ThemeProvider>
    );

}

export default SavedView;