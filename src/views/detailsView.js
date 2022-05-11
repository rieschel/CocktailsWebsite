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
import Tooltip from '@mui/material/Tooltip';
import { Rating } from "@mui/material";
import { Badge } from "@mui/material";
import {Card} from "@mui/material"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { minWidth } from "@mui/system";



function detailsView(props) {

    let d = props.drinkData[0];
    function emptyCB(i) { if (i != "" || i) return true }
    let ingredients = [d.strIngredient1, d.strIngredient2, d.strIngredient3, d.strIngredient4, d.strIngredient5];
    let measures = [d.strMeasure1, d.strMeasure2, d.strMeasure3, d.strMeasure4, d.strMeasure5];
    ingredients = ingredients.filter(emptyCB);
    measures = measures.filter(emptyCB);
    let instructions = d.strInstructions.split("\r\n");

    const drink = {strDrink: d.strDrink, strDrinkThumb: d.strDrinkThumb, idDrink: d.idDrink};

    function saveDrinkACB() {
        props.onSaveDrink(drink);
    }

    function rateDrinkACB(event, newValue) {
        props.onDrinkRate(drink, newValue);
        setValue(newValue);
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
        if(drinkRating.length==0) return 0;
        else return drinkRating[drinkRating.length-1].r;
    }

    function getSaveButton() {
        function sameDrinkCB(d) { if (d['idDrink']!=drink['idDrink']) return true }
        if(!props.currentUser.user) {return;}
        if(props.drinkList.filter(sameDrinkCB).length == props.drinkList.length){
            return (
                <Tooltip title="Save">
                    <IconButton onClick={saveDrinkACB}><FavoriteBorderIcon color="heart"></FavoriteBorderIcon></IconButton>
                </Tooltip>
            );
        }
        else {
            return (
                <Tooltip title="Delete">
                    <IconButton onClick={removeDrinkACB}><FavoriteIcon color="heart"></FavoriteIcon></IconButton>
                </Tooltip>
            );
        }
    }

    function userRating(){
        if(!props.currentUser.user) {return;}
        else { 
            return (
                <Box align center>
                    <Tooltip title="Rate">
                        <Rating size="large" name="half-rating-read" value={getRatingACB()}  onChange={rateDrinkACB} />
                    </Tooltip>
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
            <IconButton color="black" onClick={goBackACB}><ArrowBackIosIcon></ArrowBackIosIcon></IconButton>
            <Card sx={{ display: "flex" , flexShrink:0 , minWidth:70, maxWidth:1000  }}>
                <Grid container spacing={3}>
                    <Grid xs={6} md={4} sx={{m:2}} item>
                        <Box sx={{m:2}}>
                            {userRating()}
                            <Badge badgeContent={getSaveButton()}>
                                <CardMedia
                                    sx={{align:"center", width: 300,}}
                                    component="img"
                                    height="300"
                                    image={props.drinkData[0].strDrinkThumb}
                                />
                            </Badge>
                        </Box>
                       
                    </Grid>
                    <Box sx={{ display: 'flex', flexBasis:"0", ml:3 }}> 
                        <CardContent sx={{ flex: "1 0 auto"  }}>
                            <Typography variant="h4" align="left" sx={{pt:1}}>{props.drinkData[0].strDrink}</Typography>                         
                                <Grid xs={3} md={3} sx={{m:2}} item>
                                    <Typography variant="h5" align="left">Ingredients</Typography> 
                                    <Box sx={{ display: 'flex', alignItems: 'left' }}>
                                        <table align="left" >
                                            <td>
                                                <Grid container direction='column'>
                                                    {measures.map(renderCB)}                                        
                                                </Grid>                                    
                                            </td>
                                            <td>
                                                <Grid  container direction='column'>
                                                    {ingredients.map(renderCB)}
                                                </Grid>
                                            </td>
                                        </table>   
                                    </Box>
                                </Grid>
                                <Grid xs={3} md={3} sx={{m:2}} item>
                                    <Typography variant="h5" align="left">Instructions</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'left', minWidth :100}} >
                                        {instructions.map(renderCB)}
                                    </Box>  
                                </Grid>
                        </CardContent>
                    </Box>
                </Grid>
            </Card>
        </ThemeProvider>   
        
    );
}

export default detailsView;