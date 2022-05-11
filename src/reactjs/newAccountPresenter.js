import CreateNewAccount from "../views/createNewAccount";

function NewAccountPresenter(props){
    function createAccountACB(user){
        var success = props.model.addUser(user);
        alert(success);
        if(success == "New user successfully created!") {
            window.location.hash = "#login";
        }
    }

    return(
        <CreateNewAccount onCreateAccount={createAccountACB}/>
    )
}

export default NewAccountPresenter;