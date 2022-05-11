import CreateNewAccount from "../views/createNewAccount";

function NewAccountPresenter(props){
    function createAccountACB(user){
        if(!props.model.addUser(user)){
            alert("Username already exists")
        }else{
            alert("New user successfully created!")
            window.location.hash = "#login"
        }
    }

    return(
        <CreateNewAccount onCreateAccount={createAccountACB}/>
    )
}

export default NewAccountPresenter;