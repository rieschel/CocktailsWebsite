import { useState } from "react";
import { checkUser } from "../firebaseModel";

function LoginView(props){
    const [username, setUsername] = useState();
    const [passWord, setPassWord] = useState();


    function handleSubmitACB(){
        console.log("inside handle submit")
        props.onSubmit({user: username, pass: passWord});
    }

    function usernameACB(event){
        console.log(props.users)
        setUsername(event.target.value)
    }

    function passwordACB(event){
        setPassWord(event.target.value)
    }

    function newAccountACB(){
        window.location.hash = "#create_new_account"
    }

    const renderForm = (
        
        <div>
            <div>{props.user.user}</div>
          <form onSubmit={handleSubmitACB}>
            <div>
              <label>Username </label>
              <input type="text" onChange={usernameACB} required />
            </div>
            <div>
              <label>Password </label>
              <input type="password" onChange={passwordACB} required />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
          <button onClick={newAccountACB}>Create new account</button>
        </div>
      );

    return(
        renderForm
    )
}

export default LoginView;