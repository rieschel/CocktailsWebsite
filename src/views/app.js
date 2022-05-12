

import Show from "../reactjs/show.js"


const Search=require("../reactjs/SearchPresenter.js").default;
const Saved=require("../reactjs/SavedPresenter.js").default;
const Details=require("../reactjs/detailsPresenter.js").default;
const Login=require("../reactjs/loginPresenter.js").default;
const NewAccount=require("../reactjs/newAccountPresenter.js").default;
const Shakeitup=require("../reactjs/shakeitupPresenter.js").default;

function App(props) {

    return (
        <div>
            <Show hash="#shakeitup"><Shakeitup model = {props.model}/></Show>
            <Show hash="#login"><Login model = {props.model}/></Show>
            <Show hash="#create_new_account"><NewAccount model = {props.model}/></Show>
            <Show hash="#search"><Search model = {props.model}></Search></Show>
            <Show hash="#saved_drinks"><Saved model = {props.model}></Saved></Show>
            <Show hash="#details"><Details model={props.model}></Details></Show>
        </div>  
    );
}

export default App;