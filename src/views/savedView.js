import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

function SavedView(props) {

    function renderDrinkCB(drink) { 

        function removeDrinkACB() {
            props.onDrinkRemove(drink);
        }

        function setCurrentDrinkACB() { 
            props.onCurrentDrink(drink['idDrink']);
            props.onHashChange(window.location.hash);
            window.location.hash = "#details";
        }

        function getRatingACB() {
            function sameDrinkCB(e) {if (e.d==drink['idDrink']) return true }
            let drinkRating = props.ratingList.filter(sameDrinkCB);
            if(drinkRating.length==0) return "not rated yet";
            else return drinkRating[drinkRating.length-1].r;
        }
        
        const rating = getRatingACB();

        return (
            <ThemeProvider theme = {theme}>
                <Grid item key={drink['idDrink']}>
                    <Box>
                        <Typography align ="center" variant="h6" onClick={setCurrentDrinkACB}>{drink['strDrink']}</Typography>
                        <Button onClick={removeDrinkACB} startIcon={<DeleteIcon></DeleteIcon>}></Button>
                        <Typography display="inline">Rating: {rating}</Typography>
                        <br></br>
                        <img width='300px' src = {drink['strDrinkThumb']} align='center' onClick={setCurrentDrinkACB}></img>                    
                    </Box>
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <br></br>
            <Typography sx={{m:2}} variant="h3" align="center">Saved Drinks</Typography>
            <br></br>
            <Grid container spacing = {{xs:5, md:5}}>
                {props.drinkList.map(renderDrinkCB)}
            </Grid>
        </ThemeProvider>
    );

}

export default SavedView;