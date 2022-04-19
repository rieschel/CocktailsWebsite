import { Typography } from "@mui/material";
import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

function detailsView(props) {

    let d = props.drinkData[0];
    function emptyCB(i) { if (i != "" || i) return true }
    let ingredients = [d.strIngredient1, d.strIngredient2, d.strIngredient3, d.strIngredient4, d.strIngredient5];
    let measures = [d.strMeasure1, d.strMeasure2, d.strMeasure3, d.strMeasure4, d.strMeasure5];
    ingredients = ingredients.filter(emptyCB);
    measures = measures.filter(emptyCB);
    let instructions = d.strInstructions.split("\r\n");

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
            <Typography sx={{m:2}} variant="h3" align="center">{props.drinkData[0].strDrink}</Typography>
            <br></br>
            <Grid 
                container 
                spacing={0} 
                direction="column"
                alignItems="center" 
                justify="center"
                // style={{maxHeight:'50vh'}}
                >
                <img src={props.drinkData[0].strDrinkThumb} height="300px" ></img>
            </Grid>
            <br></br>
            <br></br>
            <table align="center">
                <td>
                    <Typography variant="h6" align="center">Ingredients</Typography>
                    <table align="center">
                        <td>
                            <Grid container direction='column' spacing = {{xs:2, md:2}} >
                                {measures.map(renderCB)}
                            </Grid>
                        </td>
                        <td>
                            <Grid container direction='column' spacing = {{xs:2, md:2}} >
                                {ingredients.map(renderCB)}
                            </Grid>
                        </td>
                    </table>
                </td>
                <td>
                    <Typography variant="h6" align="center">Instructions</Typography>
                    <Grid container direction='column' spacing = {{xs:2, md:2}} >
                        {instructions.map(renderCB)}
                    </Grid>
                </td>
            </table>
        </ThemeProvider> 
            
        
    );
}

export default detailsView;