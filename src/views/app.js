
import Box from '@mui/material/Box';

const Search=require("../reactjs/SearchPresenter.js").default;
const Saved=require("../reactjs/SavedPresenter.js").default

function App(props) {
    return (
         <Box>
            <Search model = {props.model}></Search>
            <Saved model = {props.model}></Saved>
        </Box>
    );
}

export default App;