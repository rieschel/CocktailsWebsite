import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from "@mui/material";
import {Rating} from  "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';  
import Tooltip from '@mui/material/Tooltip';

function SearchResults(props){

    function showResultACB(result){
        if(!props.searchResults){
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
            if(drinkRating.length==0) return 0;
            else return drinkRating[drinkRating.length-1].r;
        }

        function setCurrentDrinkACB() { 
            props.onCurrentDrink(result['idDrink']);
            props.onHashChange(window.location.hash);
            window.location.hash = "#details";
        }

        function rateDrinkACB(event, newValue) {
            props.onDrinkRate(result, newValue);
        }

        function getSaveButton() {
            function sameDrinkCB(d) { if (d['idDrink']!=result['idDrink']) return true }
            if(!props.currentUser.user) {return;}
            else{
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
        }

        function userRating() {
            if(!props.currentUser.user) {return;}
            else { 
                return (
                    <Box>
                        <Tooltip title="Rate">
                            <Rating sx={{top:8}}name="half-rating-read" value={getRatingACB()}  onChange={rateDrinkACB} />
                        </Tooltip>
                    </Box>
                );
            }
        }

        return (
            <ThemeProvider key={result['idDrink']} theme = {theme}>
                <Grid item key = {result['idDrink']}>
                    <Badge badgeContent={ getSaveButton()} > 
                        <Tooltip title="Find out more">
                            <Card sx={{ maxWidth: 300 }}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={setCurrentDrinkACB}
                                        component="img"
                                        height="250"
                                        image={result['strDrinkThumb']}
                                    />
                                    <CardContent>
                                        <Typography onClick={setCurrentDrinkACB} gutterBottom variant="h5" component="div">
                                            {result['strDrink']}
                                        </Typography>
                                        {userRating()} 
                                    

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Tooltip>
                    </Badge>
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