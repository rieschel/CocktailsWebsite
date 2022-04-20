import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { height } from "@mui/system";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';



function SearchResults(props){

    // console.log(props.searchResults)
    function showResultACB(result){
        //console.log("showing results. " + props.searchResults)
        if(!props.searchResults){
            console.log("no found results");
            return(
                <div>No results</div>
            )
        }

        function saveDrinkACB() {
            console.log("view saved");
            props.onSaveDrink(result);
        }

        function getRatingACB() {
            function sameDrinkCB(e) {if (e.d==result['idDrink']) return true }
            let drinkRating = props.ratingList.filter(sameDrinkCB);
            if(drinkRating.length==0) return "not rated yet";
            else return drinkRating[drinkRating.length-1].r;
        }

        function setCurrentDrinkACB() { 
            props.onCurrentDrink(result['idDrink']);
            props.onHashChange(window.location.hash);
            window.location.hash = "#details";
        }

        function userRating() {
            if(!props.currentUser.user) {return;}
            else { 
                return (
                    <Box>
                        <Button onClick={saveDrinkACB} startIcon={<StarIcon></StarIcon>}></Button>
                        <Typography display="inline">Rating: {getRatingACB()}</Typography>
                    </Box>
                );
            }
        }

        return (
            <ThemeProvider key={result['idDrink']} theme = {theme}>
                <Grid item key = {result['idDrink']}>
                    <Box>
                        <Typography variant='h6' align='center' onClick={setCurrentDrinkACB}>{result['strDrink']}</Typography>
                        {userRating()}
                        <br></br>
                        <img src = {result['strDrinkThumb']} height='300px' align='center' onClick={setCurrentDrinkACB}></img>
                    </Box>
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme = {theme}>
            <Box align="center">
                <Grid container spacing = {{xs:5, md:5}} align-items="center">
                    {props.searchResults.map(showResultACB)}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default SearchResults;