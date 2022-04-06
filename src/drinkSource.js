import {BASE_URL, API_KEY} from "/src/apiConfig.js"

function getDrinkDetails(drinkid){
    function treatHTTPResponseACB(response){ 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(results) {
        return Object.values(results)[0];
    }

    return (

        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/lookup.php?i=' + drinkid)
        .then(treatHTTPResponseACB).then(transformResultACB));
}


function searchDrinks(){
    
    function treatHTTPResponseACB(response) { 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(results) {
        return Object.values(results)[0];
    }

   
    return (
        
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/random.php')
        .then(treatHTTPResponseACB).then(transformResultACB));
}

function treatHTTPResponseACB(response) { 
    if (response.status!==200 ) throw "API problem";     // or response.status!==200 
    return response.json();
}

function transformResultACB(results) {
    return Object.values(results)[0];
}

function searchDrinkByIngredient(params){
       
    return (        
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/filter.php?i=' + params.i)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

export {searchDrinks, searchDrinkByIngredient, getDrinkDetails}