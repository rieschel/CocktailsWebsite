import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import { Popover } from '@mui/material';
import CheckboxesGroup from './filterMenu.js';
import Tooltip from '@mui/material/Tooltip';
import theme from "./theme.js";

function SearchView(props) {

    const alc = [{name:"gin", checked:false}, {name:"rum", checked:false}, {name:"vodka", checked:false}];
    const garnish = [{name:"lemon", checked:false}, {name:"orange", checked:false}, {name:"basil", checked:false}];
    const [alcList, setAlcList] = React.useState([...alc]);
    const [garnishList, setGarnishList] = React.useState([...garnish]);

    /* console.log("Searchview value of alc "+ props.alc) */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonRef = React.useRef();
    function handleClick() {
        setAnchorEl(buttonRef.current);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    function searchACB(){
        console.log("sw on search")
        props.onSearch();
    }

    function filterACB(ingr){
        console.log("searchview ingr :" + ingr)
        props.onFilter(ingr);
    }

    function textInputACB(event){
        /* console.log("inside search view") */
        console.log(event.target.value)
        props.onTextInput(event.target.value);
    }
    function handleKeyACB(e){
        if (e.key === 'Enter') {
            props.onSearch();
            //alert(e.target.value);
        }
    }

    function setAlcACB(alc){
        setAlcList(alc);
    }

    function setGarACB(gar){
        setGarnishList(gar);
    }

    return (
            <ThemeProvider theme = {theme}>
                <Box sx={{color:'background.main'}}>
                    <br></br>
                    <Typography align="center" variant="h4" sx={{m:2, color:'black.main'}}>Search for drinks</Typography>
                    <br></br>
                    <Tooltip title="Search drinks by name">
                        <TextField 
                            onChange={textInputACB}
                            onKeyPress={handleKeyACB}
                            //width=
                            sx={{m:0, top:15, width:0.5}}
                            variant="outlined"
                            color="black"
                            placeholder="Type something..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color = "black"></SearchIcon>
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>
                    </Tooltip>
                    <Tooltip title="Filter drinks by ingredients">
                        <Button
                            color="black"
                            ref={buttonRef}
                            id={1} 
                            sx={{p:1.5, m:2, paddingTop:1.75, paddingBottom:1.75}} 
                            variant="outlined" 
                            startIcon={<FilterAltIcon></FilterAltIcon>}
                            onClick={handleClick} 
                            >
                            Filter
                        </Button>
                    </Tooltip>
                    <Popover
                        sx={{height: 700 ,maxHeight: 1000 , width:700}}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                        }}
                        transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                        }}
                    >
                        <CheckboxesGroup alc={alcList} garnish={garnishList} onChangeAlc={setAlcACB} onChangeGar={setGarACB} onFilter={filterACB} onClose={handleClose}/>
                    </Popover>   
                    {/* {props.drinks.map(renderDrinkCB)} */}

                </Box>
            </ThemeProvider>
    );

}

export default SearchView;