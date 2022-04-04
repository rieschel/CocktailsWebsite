import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function SavedView(props) {

    function renderDrinkCB(drink) { 
        console.log("render saved drink");

        function removeDrinkACB() {
            console.log("remove drink view");
            props.onDrinkRemove(drink);
        }

        return (
            <ThemeProvider theme = {theme}>
                <Box>
                    <Typography key = {drink['idDrink']} sx={{m:2}}>{drink['strDrink']}</Typography>
                    <Button onClick={removeDrinkACB}>Remove</Button>
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box align="right" width="300px">
                <Typography sx={{m:2}} variant="h6">Saved Drinks</Typography>
                {props.drinkList.map(renderDrinkCB)}
                {console.log("in return saved")}
            </Box>
        </ThemeProvider>
    );

}

export default SavedView;