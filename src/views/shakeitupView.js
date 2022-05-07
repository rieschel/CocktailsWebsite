import React from "react";
import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { generateRandomDrink } from "../drinkSource.js";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function ShakeitupView(props) {
  function doSearchACB() {
    console.log("Clicking generate");
    props.onSearch();
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography
        align="center"
        variant="h4"
        sx={{ m: 2, color: "black.main" }}
      >
        Random drink generator
      </Typography>
      <Typography align="center">
        <Button
          align="center"
          color="black"
          variant="outlined"
          onClick={doSearchACB}
        >
          SHAKE IT UP!
        </Button>
      </Typography>
    </ThemeProvider>
  );
}

export default ShakeitupView;
