import theme from "../views/theme.js";
import {ThemeProvider} from '@mui/material/styles';

import SavedView from "../views/savedView.js";

function SavedPresenter(props) {

    return (
        <ThemeProvider theme={theme}>
            <SavedView drinks={props.model.drinks}></SavedView>
        </ThemeProvider>
    );

}

export default SavedPresenter;