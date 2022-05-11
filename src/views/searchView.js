import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckboxesGroup from "./filterMenu.js";
import Tooltip from "@mui/material/Tooltip";
import theme from "./theme.js";
import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { Collapse } from "@mui/material";


function SearchView(props) {
  const alc = [
    { name: "gin", checked: false },
    { name: "rum", checked: false },
    { name: "vodka", checked: false },
    { name: "tequila", checked: false},
    { name: "whiskey", checked: false},
  ];
  const garnish = [
    { name: "lemon", checked: false },
    { name: "orange", checked: false },
    { name: "lime", checked: false },
    { name: "sprite", checked: false},
    { name: "sugar syrup", checked: false},
  ];
  const [alcList, setAlcList] = React.useState([...alc]);
  const [garnishList, setGarnishList] = React.useState([...garnish]);

  const [expandName, setExpandName] = React.useState();
  const [expandIngredients, setExpandIngredients] = React.useState();

  function filterACB(ingr) {
    console.log("searchview ingr :" + ingr);
    props.onFilter(ingr);
  }

  function textInputACB(event) {
    props.onTextInput(event.target.value);
  }

  function handleKeyACB(e) {
    if (e.key === 'Enter') {
      props.onSearch();
    }
  }

  function handleSearchButtonACB(e) {
    props.onSearch();
  }

  function setAlcACB(alc) {
    setAlcList(alc);
  }

  function setGarACB(gar) {
    setGarnishList(gar);
  }

  function handleDropDownIngredientsACB() {
    setExpandIngredients(!expandIngredients);
    setExpandName(false);
  }

  function handleDropDownNameACB() {
    setExpandName(!expandName);
    setExpandIngredients(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ color: "background.main" }}>
        <br></br>
        <Typography
          align="center"
          variant="h4"
          sx={{ m: 2, color: "black.main" }}
        >
          Search for drinks
        </Typography>
        <br></br>
        <Card>
          <Typography variant="h6" sx={{ m: 2, color: "black.main" }}>
            By Cocktail Name:
          </Typography>
          <IconButton onClick={handleDropDownNameACB}>
            <ArrowDropDown />
          </IconButton>
          <br></br>
          <Collapse in={expandName}>
            <Tooltip title="Search drinks by name">
              <TextField
                onChange={textInputACB}
                onKeyPress={handleKeyACB}
                sx={{ m: 0, top: 15, width: 0.5 }}
                variant="outlined"
                color="black"
                placeholder="ex Margatia or Manhattan"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="black"></SearchIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Tooltip>
            <Button
              sx={{ m: 0, top: 15, height: 55, marginLeft: 1 }}
              variant="contained"
              onClick={handleSearchButtonACB}
            >
              Search
            </Button>
            <br></br>
            <br></br>
          </Collapse>
        </Card>
        <br></br>
        <br></br>
        <Card>
          <Typography variant="h6" sx={{ m: 2, color: "black.main" }}>
            Or By Popular Ingredients:
          </Typography>
          <IconButton onClick={handleDropDownIngredientsACB}>
            <ArrowDropDown />
          </IconButton>
          <Collapse in={expandIngredients}>
            <Tooltip title="Filter drinks by ingredients">
              <Box>
                <CheckboxesGroup
                  alc={alcList}
                  garnish={garnishList}
                  onChangeAlc={setAlcACB}
                  onChangeGar={setGarACB}
                  onFilter={filterACB}
                />
              </Box>
            </Tooltip>
          </Collapse>
        </Card>
        <br></br>
        <br></br>
      </Box>
    </ThemeProvider>
  );
}

export default SearchView;
