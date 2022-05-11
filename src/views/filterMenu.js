import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';


export default function CheckboxesGroup(props) {
  
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

  const handleAlcChange = (event) => {
    const temp = [...props.alc]
    const objIndex = temp.findIndex((obj => obj.name == event.target.name));
    temp[objIndex].checked = !temp[objIndex].checked; 
    props.onChangeAlc([...temp]); 
  };

  const handleGarnishChange = (event) => {
    const temp = [...props.garnish]
    const objIndex = temp.findIndex((obj => obj.name == event.target.name));
    temp[objIndex].checked = !temp[objIndex].checked; 
    props.onChangeGar([...temp])
  };

  function renderACheckbox(ing){
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
    const searchAlc = props.alc.map(alc => {if (alc.checked ==true) return alc.name}).join();
    const searchGarnish = props.garnish.map(garnish => {if (garnish.checked ==true) return garnish.name}).join();
    const searchParams = searchAlc + "," + searchGarnish
    const clean = searchParams.replace(/^,,*|,+(?=,|$)/g, '');
    if (clean===""){
      alert("no filters were selected")
    } 
    props.onFilter(clean);

  }

  

  function resetACB(){
    const tempAlc = [...props.alc];
    const tempGarnish = [...props.garnish];

    function resetCheckedACB(ingredient){
      ingredient.checked = false;
    }

    tempAlc.map(resetCheckedACB);
    tempGarnish.map(resetCheckedACB);

    props.onChangeAlc([...tempAlc]);
    props.onChangeGar([...tempGarnish]);

    props.onFilter("");
  }
  

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3}} component="fieldset" variant="standard">
        <FormLabel component="legend">Alcohol</FormLabel>
        <Divider />
        <FormGroup>
          { props.alc.map(renderACheckbox)}  
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
          { props.garnish.map(renderGCheckbox)}  
        </FormGroup>
      </FormControl>

      <Grid container direction="column" spacing={2} sx={{mt:3}}>
        <Grid item><Button variant='contained' onClick={resetACB}>Reset</Button></Grid>
        <Grid item><Button variant='contained' onClick={filterACB}>Search</Button></Grid>
      </Grid>
      
    </Box>
    
  );
}
