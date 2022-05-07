import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Button, Divider } from '@mui/material';
import { fetchIngredientList} from '../drinkSource';

export default function CheckboxesGroup(props) {
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  const alc = [{name:"gin", checked:false}, {name:"rum", checked:false}, {name:"vodka", checked:false}, {name:"light rum", checked:false}, {name:"dark rum", checked:false}, {name:"applejack", checked:false}, {name:"sweet vermouth", checked:false}];
  //Alkoholer = Strawberry schnapps, Scotch, Apricot brandyTriple sec
  //Southern Comfort, Orange bitters, Brandy, Lemon vodka, Blended whiskey, Dry Vermouth
  // Amaretto, Tea, Champagne, Coffee liqueur, Bourbon, Tequila, Vodka, Añejo rum, Bitters, Sugar
  // Kahlua, demerara Sugar, Dubonnet Rouge, Watermelon, Lime juice, Irish whiskey, Apple brandy
  // Carbonated water, Cherry brandy, Creme de Cacao, Grenadine, Port, Coffee brandy, Red wine
  // Rum, Grapefruit juice, Ricard, Sherry, Cognac, Sloe gin, Apple juice, Pineapple juice
  // Lemon juice, Sugar syrup, Milk, Strawberries, Chocolate syrup, Yoghurt, Mango, Ginger
  // Lime, Cantaloupe, Berries, Grapes, Kiwi, Tomato juice, Cocoa powder, Chocolate
  // Heavy cream, Galliano, Peach Vodka, Ouzo, Coffee, Spiced rum, Water
  // Espresso, Angelica root, Orange, Cranberries, Johnnie Walker, Apple cider, Everclear
  // Cranberry juice, Egg yolk, Egg, Grape juice, Peach nectar, Lemon, Firewater
  // Lemonade, Lager, Whiskey, Absolut Citron, Pisco, Irish cream, Ale,Chocolate liqueur
  // Midori melon liqueur, Sambuca, Cider, Sprite, 7-Up, Blackberry brandy, Peppermint schnapps, Creme de Cassis
 
  const garnish = [{name:"lemon", checked:false}, {name:"orange", checked:false}, {name:"basil", checked:false}];

  //const promise = React.useState(function initializePromiseACB(){ const first = fetchIngredientList(); first.then(function saveDataACB(dt){setData(dt);}).catch(function saveErrACB(er){setError(er)})});
    
  //console.log("data "+ props.alc);     
  const [alcList, setAlclist] = React.useState([...alc]);
  const [garnishList, setGarnishList] = React.useState([...garnish]);
  /* const [alcList, setAlclist] = React.useState([...props.alc]);
  const [garnishList, setGarnishList] = React.useState([...props.garnish]); */

  const handleAlcChange = (event) => {
    console.log(event.target.checked)
    const temp = [...alcList]
    const objIndex = temp.findIndex((obj => obj.name == event.target.name));
    temp[objIndex].checked = !temp[objIndex].checked; 
    setAlclist([...temp]);    
  };

  const handleGarnishChange = (event) => {
    console.log(event.target.name)
    const temp = [...garnishList]
    const objIndex = temp.findIndex((obj => obj.name == event.target.name));
    temp[objIndex].checked = !temp[objIndex].checked; 
    setGarnishList([...temp]);
    
  };

  function renderACheckbox(ing){
    console.log("rendering checkbox")
    console.log(props.ingredients)
    return(
      <FormControlLabel
        key={ing.name}
        label={ing.name}
        control={
          <Checkbox checked={ing.checked} onChange={handleAlcChange} name={ing.name} />
        }/> 
    );
  }

  function renderGCheckbox(ing){
    return(
      <FormControlLabel
        key={ing.name}
        label={ing.name}
        control={
          <Checkbox checked={ing.checked} onChange={handleGarnishChange} name={ing.name} />
        }/> 
    );
  }

  function filterACB(){
    //console.log(alcList);
    const searchAlc = alcList.map(alc => {if (alc.checked ==true) return alc.name}).join();
    const searchGarnish = garnishList.map(garnish => {if (garnish.checked ==true) return garnish.name}).join();
    const searchParams = searchAlc + "," + searchGarnish
    const clean = searchParams.replace(/^,,*|,+(?=,|$)/g, '');
    console.log("search "+clean)
    if (clean===""){
      alert("no filters were selected")
      return;
    } 
    //console.log(clean); 
    props.onFilter(clean);

  }

  function closeACB(){
    props.onClose();
  }
  

  return (
    <Box sx={{ display: 'flex' }} onChange={filterACB}>
      <FormControl sx={{ m: 3}} component="fieldset" variant="standard">
        <FormLabel component="legend">Alcohol</FormLabel>
        <Divider />
        <FormGroup>
          { alcList.map(renderACheckbox)}  
        </FormGroup> 
      </FormControl>
     
      <FormControl    
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Garnish</FormLabel>
        <Divider />
        <FormGroup>
          { garnishList.map(renderGCheckbox)}  
        </FormGroup>
      </FormControl>
      
      <Button variant='text' sx={{p:0, right:20,left:5, height:40}}  onClick={closeACB}>
        X
      </Button>
      
    </Box>
    
  );
}
