import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { PropaneSharp } from '@mui/icons-material';
import Button from '@mui/material/Button'


export default function CheckboxesGroup(props) {
  const [state, setState] = React.useState({
    gin: false,
    vodka: false,
    whisky: false,
    lemon: false,
    lime: false,
    orange: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    console.log(event.target.name);
    props.onFilterInput(event.target.name);
  };

  const { gin,vodka,whisky,lemon,lime,orange } = state; 
  

  return (
    
    <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Alcohol</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox checked={gin} onChange={handleChange} name="gin" />
                }
                label="Gin"
            />
            <FormControlLabel
                control={
                <Checkbox checked={vodka} onChange={handleChange} name="vodka" />
                }
                label="Vodka"
            />
            <FormControlLabel
                control={
                <Checkbox checked={whisky} onChange={handleChange} name="whisky" />
                }
                label="whisky"
            />
            </FormGroup>
            
            
        </FormControl>
        <FormControl>
        <Divider orientation='vertical'/>
        </FormControl>
        
      
        <FormControl
            
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
        >
            
            <FormLabel component="legend">Other</FormLabel>    
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox checked={lemon} onChange={handleChange} name="lemon" />
                }
                label="Lemon"
            />
            <FormControlLabel
                control={
                <Checkbox checked={lime} onChange={handleChange} name="lime" />
                }
                label="Lime"
            />
            <FormControlLabel
                control={
                <Checkbox checked={orange} onChange={handleChange} name="orange" />
                }
                label="Orange"
            />
            </FormGroup>
            
        </FormControl>
    </Box>
  );
}