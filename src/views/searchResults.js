import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import { height } from "@mui/system";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

function SearchResults(props){

    // console.log(props.searchResults)
    function showResultACB(result){

        function saveDrinkACB() {
            console.log("view saved");
            props.onSaveDrink(result);
        }

        return (
            <ThemeProvider theme = {theme}>
                <Grid item key = {result['idDrink']}>
                    <Box>
                        <Typography variant='h6' align='center'>{result['strDrink']}</Typography>
                        <Button onClick={saveDrinkACB} startIcon={<StarIcon></StarIcon>}></Button>
                        <br></br>
                        <img src = {result['strDrinkThumb']} height='300px' align='center'></img>
                    </Box>
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme = {theme}>
            <Grid container spacing = {{xs:5, md:5}}>
                {props.searchResults.map(showResultACB)}
            </Grid>
        </ThemeProvider>
    );
}

export default SearchResults;