

import Show from "../reactjs/show.js"

const Search=require("../reactjs/SearchPresenter.js").default;
const Saved=require("../reactjs/SavedPresenter.js").default;
const Navbar=require("../reactjs/navbarPresenter.js").default;
const Details=require("../reactjs/detailsPresenter.js").default;

function App(props) {
    return (

        <div>
            <Navbar></Navbar>
            <Show hash="#search"><Search model = {props.model}></Search></Show>
            <Show hash="#saved_drinks"><Saved model = {props.model}></Saved></Show>
            <Show hash="#details"><Details model={props.model}></Details></Show>
        </div>
    );
}

export default App;