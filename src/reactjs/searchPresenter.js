import React from 'react';
import ReactDOM from 'react-dom';

window.React= React;

import SearchView from '../views/searchView';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valid : ""
        }
    }

    render() {
        return (
            <div>
                <SearchView drinks = {this.props.model.drinks}></SearchView>
            </div>
        );
    }
}


export default Search;
