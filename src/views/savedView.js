import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Rating} from  "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import CardActionArea from '@mui/material/CardActionArea';


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
            if(drinkRating.length==0) return 0;
            else return drinkRating[drinkRating.length-1].r;
        }
        

        function rateDrinkACB(event, newValue) {
            props.onDrinkRate(drink, newValue);
        }

        function userRating() {
            return (
                <Box>
                    <Tooltip title="Rate">
                        <Rating sx={{top:8}} name="half-rating-read" value={getRatingACB()} onChange={rateDrinkACB}/>
                    </Tooltip>
                </Box>
            );
        }

        return (
            <ThemeProvider theme = {theme} key={drink['idDrink']}>
                <Grid item key={drink['idDrink']}>
                    <Badge 
                        badgeContent={
                            <Tooltip title="Delete">
                                <IconButton 
                                    onClick={removeDrinkACB}>
                                        <FavoriteIcon color="heart"></FavoriteIcon>
                                </IconButton> 
                            </Tooltip>}>
                        <Tooltip title="Find out more">
                            <Card sx={{maxWidth: 300}}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={setCurrentDrinkACB}
                                        component="img"
                                        height="250"
                                        image={drink['strDrinkThumb']}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography onClick={setCurrentDrinkACB} gutterBottom variant="h5" component="div">{drink['strDrink']}</Typography>
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