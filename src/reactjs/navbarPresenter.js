import React from "react";
import NavbarView from "../views/navbarView.js";

function NavbarPresenter(props) {
   const [currentUser, setCurrentUser]=React.useState({user: "", pass: ""});

   function observerACB() {
        setCurrentUser(props.model.currentUser);
    }

    function onCreateACB() {
        observerACB();
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){ props.model.removeObserver(observerACB);}
    }
    React.useEffect(onCreateACB, {});
  
    function logoutACB(){
        props.model.setCurrentUser({user: "", pass: ""});
    }

    function deleteUserACB() {
        props.model.deleteUser();
    }

    return <NavbarView onDeleteUser={deleteUserACB} currentUser={currentUser} onLogout={logoutACB}></NavbarView>;
}

export default NavbarPresenter;