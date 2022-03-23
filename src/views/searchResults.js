import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

function SearchResults(props){

    // console.log(props.searchResults)
    function showResultACB(result){
        return (
            <ThemeProvider theme = {theme}>
            <div>{result['strDrink']}</div>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme = {theme}>
        <div>
            {props.searchResults.map(showResultACB)}
            {/* {props.searchResults[0]['strDrink']} */}
        </div>
        </ThemeProvider>
    )
}

export default SearchResults;