import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function detailsView(props) {

    let d = props.drinkData[0];
    function emptyCB(i) { if (i != "" || i) return true }
    let ingredients = [d.strIngredient1, d.strIngredient2, d.strIngredient3, d.strIngredient4, d.strIngredient5];
    let measures = [d.strMeasure1, d.strMeasure2, d.strMeasure3, d.strMeasure4, d.strMeasure5];
    ingredients = ingredients.filter(emptyCB);
    measures = measures.filter(emptyCB);
    let instructions = d.strInstructions.split("\r\n");

    let sliderVal = 5;
    function handleChangeCB(event, value) {sliderVal=value}

    function saveDrinkACB() {
        console.log("view saved");
        props.onSaveDrink({strDrink: d.strDrink, strDrinkThumb: d.strDrinkThumb, idDrink: d.idDrink});
    }

    function rateDrinkACB() {
        console.log("rate drink view");
        props.onDrinkRate({strDrink: d.strDrink, strDrinkThumb: d.strDrinkThumb, idDrink: d.idDrink}, sliderVal);
    }

    function goBackACB() {
        window.location.hash = props.previousPage;
    }

    function getRatingACB() {
        function sameDrinkCB(e) {if (e.d==d.idDrink) return true }
        let drinkRating = props.ratingList.filter(sameDrinkCB);
        if(drinkRating.length==0) return "not rated yet";
        else return drinkRating[drinkRating.length-1].r;
    }
    const rating = getRatingACB();

    function renderCB(i){
        return (
            <Grid item>
                <Typography variant="body1">{i}</Typography>
            </Grid>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <br></br>
            <Button onClick={goBackACB} startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}></Button>
            <br></br>
            <Typography sx={{m:2}} variant="h3" align="center">{props.drinkData[0].strDrink}</Typography>
            <br></br>
            <Grid 
                container 
                spacing={0} 
                direction="column"
                alignItems="center" 
                justify="center"
                // style={{maxHeight:'50vh'}}
                >
                <Grid item>
                    <Box width="300px">
                        <Button onClick={saveDrinkACB} startIcon={<StarIcon></StarIcon>}></Button>
                        <Button onClick={rateDrinkACB} startIcon={<ThumbsUpDownIcon></ThumbsUpDownIcon>}></Button>
                        Rating: {rating}
                        <Slider onChange={handleChangeCB} size="small" steps={10} marks min={1} max={10} defaultValue={5} aria-label="small" valueLabelDisplay="auto"></Slider>
                    </Box>
                </Grid>
                <br></br>
                <Grid item><img src={props.drinkData[0].strDrinkThumb} height="300px" ></img></Grid>
            </Grid>
            <br></br>
            <br></br>
            <table align="center">
                <td>
                    <Typography variant="h6" align="center">Ingredients</Typography>
                    <table align="center">
                        <td>
                            <Grid container direction='column' spacing = {{xs:2, md:2}} >
                                {measures.map(renderCB)}
                            </Grid>
                        </td>
                        <td>
                            <Grid container direction='column' spacing = {{xs:2, md:2}} >
                                {ingredients.map(renderCB)}
                            </Grid>
                        </td>
                    </table>
                </td>
                <td>
                    <Typography variant="h6" align="center">Instructions</Typography>
                    <Grid container direction='column' spacing = {{xs:2, md:2}} >
                        {instructions.map(renderCB)}
                    </Grid>
                </td>
            </table>
        </ThemeProvider> 
            
        
    );
}

export default detailsView;