import Box from '@mui/material/Box';
import Show from "../reactjs/show.js"

const Search=require("../reactjs/SearchPresenter.js").default;
const Saved=require("../reactjs/SavedPresenter.js").default;

function App(props) {
    return (
        <Box>
            <Show hash="#search"><Search model = {props.model}></Search></Show>
            <Show hash="#saved_drinks"><Saved model = {props.model}></Saved></Show>
        </Box>
    );
}

export default App;