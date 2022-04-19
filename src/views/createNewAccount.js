import { useState } from "react";

function CreateNewAccount(props) {
    const [username, setUsername] = useState();
    const [passWord, setPassWord] = useState();

    function handleSubmitACB(){
        props.onCreateAccount({user: username, pass: passWord});
        window.location.hash = "#login"
    }

    function usernameACB(event){
        setUsername(event.target.value)
    }

    function passwordACB(event){
        setPassWord(event.target.value)
    }

  const renderForm = (
    <div>
      <div>Create new account</div>
      <form onSubmit={handleSubmitACB}>
        <div>
          <label>Username </label>
          <input type="text" name="uname" onChange={usernameACB} required />
        </div>
        <div>
          <label>Password </label>
          <input type="password" name="pass" onChange={passwordACB} required />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return renderForm;
}

export default CreateNewAccount;
