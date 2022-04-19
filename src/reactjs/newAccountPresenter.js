import CreateNewAccount from "../views/createNewAccount";

function NewAccountPresenter(props){
    function createAccountACB(user){
        props.model.addUser(user);
    }

    return(
        <CreateNewAccount onCreateAccount={createAccountACB}/>
    )
}

export default NewAccountPresenter;