import React from "react";
import theme from "../views/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

function ShakeitupView(){

  return (
    <ThemeProvider theme={theme}>
      <Typography
        align="center"
        variant="h4"
        sx={{ m: 2, color: "black.main" }}
      >
        SHAKE IT UP!
      </Typography>
    </ThemeProvider>
  );
}

export default ShakeitupView;
