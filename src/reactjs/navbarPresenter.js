import React from "react";
import NavbarView from "../views/navbarView.js";

function NavbarPresenter(props) {
   // const [currentUser,setCurrentUser]=React.useState(props.model.currentUser)
  
    function logoutACB(){
        props.model.setCurrentUser({user: "", pass: ""});
    }
    return <NavbarView currentUser={props.model.currentUser} onLogout={logoutACB}></NavbarView>;
}

export default NavbarPresenter;