import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

function SavedView(props) {

    function renderDrinkCB(drink) { 

        let sliderVal = 5;
        function handleChangeCB(event, value) {sliderVal=value}

        function removeDrinkACB() {
            props.onDrinkRemove(drink);
        }

        function rateDrinkACB() {
            props.onDrinkRate(drink, sliderVal);
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
                        <Typography align ="center" variant="h6" sx={{m:2}}>{drink['strDrink']}</Typography>
                        <Button onClick={removeDrinkACB} startIcon={<DeleteIcon></DeleteIcon>}></Button>
                        <Button onClick={rateDrinkACB} startIcon={<ReviewsOutlinedIcon></ReviewsOutlinedIcon>}></Button>
                        Rating: {rating}
                        <Slider onChange={handleChangeCB} size="small" steps={10} marks min={1} max={10} defaultValue={5} aria-label="small" valueLabelDisplay="auto"></Slider>
                        <br></br>
                        <img src = {drink['strDrinkThumb']} height='300px' align='center'></img>
                    </Box>
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography sx={{m:2}} variant="h3" align="center">Saved Drinks</Typography>
            <Grid container spacing = {{xs:5, md:5}}>
                {props.drinkList.map(renderDrinkCB)}
            </Grid>
        </ThemeProvider>
    );

}

export default SavedView;