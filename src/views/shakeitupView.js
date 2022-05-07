import React from "react";
import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { generateRandomDrink } from "../drinkSource.js";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function ShakeitupView(props){

  return (
    <ThemeProvider theme={theme}>
      <Typography
        align="center"
        variant="h4"
        sx={{ m: 2, color: "black.main" }}
      >
        SHAKE IT UP!
      </Typography>
      {/* <img src = "https://cdn-icons-png.flaticon.com/512/920/920632.png" height={'100'}></img> */}
      
    </ThemeProvider>
  );
}

export default ShakeitupView;
