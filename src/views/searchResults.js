import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { height } from "@mui/system";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Slider from '@mui/material/Slider';



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

        let sliderVal = 5;
        function handleChangeCB(event, value) {sliderVal=value}

        function saveDrinkACB() {
            console.log("view saved");
            props.onSaveDrink(result);
        }

        function rateDrinkACB() {
            console.log("rate drink view");
            props.onDrinkRate(result, sliderVal);
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
        
        const rating = getRatingACB();

        return (
            <ThemeProvider key={result['idDrink']} theme = {theme}>
                <Grid item key = {result['idDrink']}>
                    <Box>
                        <Typography variant='h6' align='center' onClick={setCurrentDrinkACB}>{result['strDrink']}</Typography>
                        <Button onClick={saveDrinkACB} startIcon={<StarIcon></StarIcon>}></Button>
                        <Button onClick={rateDrinkACB} startIcon={<ThumbsUpDownIcon></ThumbsUpDownIcon>}></Button>
                        Rating: {rating}
                        <Slider onChange={handleChangeCB} size="small" steps={10} marks min={1} max={10} defaultValue={5} aria-label="small" valueLabelDisplay="auto"></Slider>
                        <br></br>
                        <img src = {result['strDrinkThumb']} height='300px' align='center' onClick={setCurrentDrinkACB}></img>
                    </Box>
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme = {theme}>
            <Grid container spacing = {{xs:5, md:5}}>
                {props.searchResults.map(showResultACB)}
            </Grid>
        </ThemeProvider>
    );
}

export default SearchResults;