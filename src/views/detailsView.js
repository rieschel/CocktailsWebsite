import { Divider, Table, TableHead, Typography } from "@mui/material";
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
import { Popover } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import { Rating } from "@mui/material";


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
    const drink = {strDrink: d.strDrink, strDrinkThumb: d.strDrinkThumb, idDrink: d.idDrink};

    function saveDrinkACB() {
        console.log("view saved");
        props.onSaveDrink(drink);
    }

    function rateDrinkACB() {
        console.log("rate drink view");
        props.onDrinkRate(drink, sliderVal);
    }

    function removeDrinkACB() {
        props.onDrinkRemove(drink);
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonRef = React.useRef();
    function handleClick() {
        setAnchorEl(buttonRef.current);
    }

    function handleClose() {
        setAnchorEl(null);
        rateDrinkACB();
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    function getSaveButton() {
        function sameDrinkCB(d) { if (d['idDrink']!=drink['idDrink']) return true }
        if(props.drinkList.filter(sameDrinkCB).length == props.drinkList.length){
            return (
                <IconButton onClick={saveDrinkACB}><FavoriteBorderIcon color="heart"></FavoriteBorderIcon></IconButton>
            );
        }
        else {
            return (
                <IconButton onClick={removeDrinkACB}><FavoriteIcon color="heart"></FavoriteIcon></IconButton>
            );
        }
    }

    function getRating(){
        if(!props.currentUser.user) {return;}
        else { 
            return (
                <Box align center>
                    <Rating size="large" name="half-rating-read" defaultValue={getRatingACB()}  readOnly />
                </Box>
            );
        }
    }

    function userRating() {
        if(!props.currentUser.user) {return;}
        else { 
            return (
                <Box>
                    {getSaveButton()}
                    <IconButton id={1} ref={buttonRef} onClick={handleClick}><ThumbsUpDownIcon></ThumbsUpDownIcon></IconButton>
                    <Typography display="inline">Rating: {getRatingACB()}</Typography>
                    <Popover
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
                    }}>
                        <Slider sx={{m:3, p:3, width: '300px', mr: 6}} onChange={handleChangeCB} size="small" steps={10} marks min={1} max={10} defaultValue={5} aria-label="small" valueLabelDisplay="auto"></Slider>
                    </Popover>
                </Box>
            );
        }
    }

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
            <Button color="black" onClick={goBackACB} startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}></Button>
            
            <Typography sx={{m:2}} variant="h4" align="center">{props.drinkData[0].strDrink}</Typography>
            {/* {getRating()} */}
            <Grid container spacing={3}>
                <Grid xs={4}  sx={{m:2}} item><img src={props.drinkData[0].strDrinkThumb} height="400px" ></img></Grid>
                <Grid xs={2}item>
                       <Typography variant="h5" align="left">Ingredients</Typography>                        
                        <table /* align="center" */>
                            <td>
                                <Grid sx={{m:2}}container direction='column' spacing = {{xs:2, md:2}} >
                                    {measures.map(renderCB)}
                                    
                                </Grid>
                                
                            </td>
                            <td>
                                <Grid sx={{m:2}} container direction='column' spacing = {{xs:2, md:2}} >
                                    {ingredients.map(renderCB)}
                                </Grid>
                            </td>
                        </table>
                    </Grid>
                    <Grid xs={3} item>

                        <Typography variant="h5" /* align="center" */>Instructions</Typography>
                        <Box align="center" >
                            {instructions.map(renderCB)}
                        </Box>                                                
                </Grid>
            </Grid>            
        </ThemeProvider> 
    );
}

export default detailsView;