import LoginView from "../views/loginView";
import { updateModelFromFirebase } from "../firebaseModel";

function LoginPresenter(props){
    function loginACB(user){
        if(props.model.checkValidUser(user)){
            updateModelFromFirebase(props.model);
            window.location.hash = "#search";
        }
        else alert("Invalid username or password, please try again")
    }

    return <LoginView previousPage={props.model.previousHash} user={props.model.currentUser} users={props.model.users} onSubmit={loginACB}/>
}

export default LoginPresenter;