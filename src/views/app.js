import Filtermenu from "./filterMenu.js";
import MenuListComposition from "./MenuListComposition.js";


const Search=require("../reactjs/searchPresenter.js").default;

function App(props) {
    return (
        <div>
           {/*  <MenuListComposition/>   */}
            <Filtermenu/>
            <Search model = {props.model}></Search>
        </div>
    );
}

export default App;