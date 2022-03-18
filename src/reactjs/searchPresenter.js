import { Alert } from '@mui/material';
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
    
    onFilterACB(){
        console.log("filterclick");
    }

    render() {
        return (
            <div>
                <SearchView 
                    drinks = {this.props.model.drinks}
                    onFilterClick = {this.onFilterACB}    
                    >
                </SearchView>
            </div>
        );
    }
}


export default Search;
