import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { height } from "@mui/system";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from "@mui/material";
import {Rating} from  "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
            props.onSaveDrink(result);
        }

        function removeDrinkACB() {
            props.onDrinkRemove(result);
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

        function getSaveButton() {
            function sameDrinkCB(d) { if (d['idDrink']!=result['idDrink']) return true }
            if(!props.currentUser.user) {return;}
            else{
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
        }

        function userRating() {
            if(!props.currentUser.user) {return;}
            else { 
                return (
                    <Box>
                        <Rating sx={{top:8}}name="half-rating-read" defaultValue={getRatingACB()}  readOnly />
                        {/* {getSaveButton()} */}
                    </Box>
                );
            }
        }

        return (
            <ThemeProvider key={result['idDrink']} theme = {theme}>
                <Grid item key = {result['idDrink']}>

                <Badge badgeContent={ getSaveButton()} > 
                    <Card onClick={setCurrentDrinkACB} sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={result['strDrinkThumb']}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {result['strDrink']}
                            </Typography>
                            {userRating()} 
                        

                        </CardContent>
                    {/*  <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Badge>


                    {/* <Box>
                        <Typography variant='h6' align='center' onClick={setCurrentDrinkACB}>{result['strDrink']}</Typography>
                        {userRating()}                        
                        <br></br>
                        <Badge badgeContent={ getSaveButton()} >                           
                            <img src = {result['strDrinkThumb']} height='300px' align='center' onClick={setCurrentDrinkACB}></img>
                        </Badge>
                        
                    </Box> */}
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