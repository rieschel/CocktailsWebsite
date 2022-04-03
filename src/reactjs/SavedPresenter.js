import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

import SavedView from "../views/savedView.js";

function SavedPresenter(props) {

    const [drinks, setDrinks] = React.useState([]);

    function observerACB() {
        console.log("in observerACB");
        setDrinks(props.model.drinks);
    }

    function onCreateACB() {
        console.log("in onCreateACB");
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, []);

    function removeDrinkACB(drink) {
        props.model.removeDrink(drink);
    }

    return (
        <ThemeProvider theme={theme}>
            <SavedView drinkList={drinks} onDrinkRemove={removeDrinkACB}></SavedView>
        </ThemeProvider>
    );

}

export default SavedPresenter;