import React from "react";
import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import { Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function RandomDrinkView(props) {
  
  function saveDrinkACB() {
    props.onSaveDrink(props.randomDrink);
  }

  function removeDrinkACB() {
    props.onDrinkRemove(props.randomDrink);
  }

  function getRatingACB() {
    function sameDrinkCB(e) {
      if (e.d==props.randomDrink['idDrink']) return true 
    }
    let drinkRating = props.ratingList.filter(sameDrinkCB);
    if(drinkRating.length==0) return 0;
    else return drinkRating[drinkRating.length-1].r;
}

  function setCurrentDrinkACB() {
    props.onCurrentDrink(props.randomDrink["idDrink"]);
    props.onHashChange(window.location.hash);
    window.location.hash = "#details";
  }

  function rateDrinkACB(event, newValue) {
    props.onDrinkRate(props.randomDrink, newValue);
  }

  function getSaveButton() {
    function sameDrinkCB(d) { if (d['idDrink']!=props.randomDrink['idDrink']) return true }
    if (!props.currentUser.user) {
      return;
    } else {
      if(props.drinkList.filter(sameDrinkCB).length == props.drinkList.length){
        return (
          <Tooltip title="Save">
            <IconButton onClick={saveDrinkACB}>
              <FavoriteBorderIcon color="heart"></FavoriteBorderIcon>
            </IconButton>
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title="Delete">
            <IconButton onClick={removeDrinkACB}>
              <FavoriteIcon color="heart"></FavoriteIcon>
            </IconButton>
          </Tooltip>
        );
      }
    }
  }

  function userRating() {
    if (!props.currentUser.user) {
      return;
    } else {
      return (
        <Box>
          <Tooltip title="Rate">
            <Rating sx={{top:8}} name="half-rating-read" value={getRatingACB()} onChange={rateDrinkACB}/>
        </Tooltip>
        </Box>
      );
    }
  }

  function resetACB() {
    props.onReset();
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Button variant="contained" onClick={resetACB}>
          Reshake!
        </Button>
      <br></br>
        <Badge badgeContent={getSaveButton()}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                onClick={setCurrentDrinkACB}
                component="img"
                height="350"
                image={props.randomDrink["strDrinkThumb"]}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {props.randomDrink["strDrink"]}
                </Typography>
                {userRating()}
              </CardContent>
            </CardActionArea>
          </Card>
        </Badge>
      </Grid>
    </ThemeProvider>
  );
}

export default RandomDrinkView;
