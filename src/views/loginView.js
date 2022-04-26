import { Grid,Paper, Avatar, Button, Typography,Link } from '@mui/material'
import {TextField} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles';
import theme from "../views/theme.js";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';


function LoginView(props){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const paperStyle= {padding :20,height:'70vh',width:280, margin:"20px auto"}
    const [triedToLogIn, setTriedToLogIn] = useState(false);

    function handleSubmitACB(){
        console.log("inside handle submit")
        console.log("Username: " + username + " password: " + password)
        if(!username ||!password){
          setTriedToLogIn(true);
          return;
        }
        props.onSubmit({user: username, pass: password});
    }

    function usernameACB(event){
        //console.log(props.users)
        setUsername(event.target.value)
    }

    function passwordACB(event){
        setPassword(event.target.value)
    }

    function newAccountACB(){
        window.location.hash = "#create_new_account"
    }

    function goBackACB() {
        window.location.hash = props.previousPage;
    }

    const renderForm = (
      <ThemeProvider key={"login"} theme={theme}>
        <br></br>
        <IconButton color="black" onClick={goBackACB}><ArrowBackIosIcon></ArrowBackIosIcon></IconButton>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                  <Avatar style={{margin:10}}></Avatar>
                  <Typography variant="h5">Sign in</Typography>
              </Grid>
              <TextField 
                variant="standard" label='Username' placeholder='Enter username'onChange={usernameACB} fullWidth error={username==undefined &&triedToLogIn}/>
              <TextField variant="standard" label='Password' placeholder='Enter password' type='password' onChange={passwordACB} fullWidth error={password==undefined &&triedToLogIn}/>
              <Button variant="contained" onClick={handleSubmitACB} style={{margin:'8px 0'}} fullWidth >Submit</Button>
              <Button color="black" onClick={newAccountACB} fullWidth>Create new account</Button>
          </Paper>
        </Grid>
      </ThemeProvider>
      );


    return(
        renderForm
    );
}

export default LoginView;