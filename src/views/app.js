const Search=require("../reactjs/searchPresenter.js").default;

function App(props) {
    return (
        <div>
            <Search model = {props.model}></Search>
        </div>
    );
}

export default App;