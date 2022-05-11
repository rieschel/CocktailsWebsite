import { useState } from "react";
import { Grid,Paper, Avatar, Button, Typography,Link } from '@mui/material'
import {TextField} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles';
import theme from "../views/theme.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

function CreateNewAccount(props) {
    const [username, setUsername] = useState();
    const [password, setPassWord] = useState();
    const paperStyle= {padding :20,height:'70vh',width:280, margin:"20px auto"}
    const [triedToLogIn, setTriedToLogIn] = useState(false);

    function handleSubmitACB(){
        if(!username ||!password){
          setTriedToLogIn(true);
          return;
        }
        props.onCreateAccount({user: username, pass: password});
    }

    function usernameACB(event){
        setUsername(event.target.value)
    }

    function passwordACB(event){
        setPassWord(event.target.value)
    }

    function goBackACB() {
      window.location.hash = "login";
    }

    function handleKeyACB(e) {
      if (e.key === 'Enter') {
        props.onCreateAccount({user: username, pass: password});
      }
    }

  const renderForm = (
    <ThemeProvider key={"new_account"} theme={theme}>
        <Grid>
        <br></br>
        <IconButton color="black" onClick={goBackACB}><ArrowBackIosIcon></ArrowBackIosIcon></IconButton>
          <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                  <Avatar style={{margin:10}}></Avatar>
                  <Typography variant="h5">Create new account</Typography>
              </Grid>
              <TextField 
                variant="standard" label='Username' placeholder='Enter username'onChange={usernameACB} fullWidth error={username==undefined &&triedToLogIn}/>
              <TextField variant="standard" label='Password' placeholder='Enter password' type='password' onKeyPress={handleKeyACB} onChange={passwordACB} fullWidth error={password==undefined &&triedToLogIn}/>
              <Button variant="contained" onClick={handleSubmitACB} style={{margin:'8px 0'}} fullWidth >Confirm</Button>
          </Paper>
        </Grid>
      </ThemeProvider>
  );

  return renderForm;
}

export default CreateNewAccount;
