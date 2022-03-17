import Box from '@mui/material/Box';

const Search=require("../reactjs/searchPresenter.js").default;

function App(props) {
    return (
        <Box>
            <Search model = {props.model}></Search>
        </Box>
    );
}

export default App;