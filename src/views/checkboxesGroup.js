import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Button, Divider } from '@mui/material';

export default function CheckboxesGroup(props) {
  const alc = [{name:"gin", checked:false}, {name:"rum", checked:false}, {name:"vodka", checked:false}];
 
  const garnish = [{name:"lemon", checked:false}, {name:"orange", checked:false}, {name:"basil", checked:false}];

  const [alcList, setAlclist] = React.useState([...alc]);
  const [garnishList, setGarnishList] = React.useState([...garnish]);

  const handleAlcChange = (event) => {
    console.log(event.target.name)
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

  function filterACB() {
    console.log("filter in checkboxes group");
    props.onFilter();
  }
  

  return (
    <Box sx={{ display: 'flex' }}>
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
      <Button ariant="outlined" sx={{p:1.5, m:2, height:20}} onClick={filterACB}>
        Search
      </Button>
    </Box>
  );
}
