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

    function renderIngredientsCB(ingredient){
        return 
        (<div key={ingredient}>
            {props.drinkData.ingredient}
        </div>);
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
                style={{maxHeight:'50vh'}}
                >
                <img src={props.drinkData[0].strDrinkThumb}></img>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing = {{xs:5, md:5}}>
                {renderIngredientsCB}
            </Grid>
        </ThemeProvider> 
            
        
    );
}

export default detailsView;