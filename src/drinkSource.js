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

function generateRandomDrink(){
    function treatHTTPResponseACB(response){ 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(result) {
        return Object.values(result)[0][0];
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

function searchDrinkByName(params){
    function transformResultACB(results) {
        if(results.drinks == null){
            return "No cocktails with this name"
        }else{
            return Object.values(results)[0];
        }
    }

    return (     
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/search.php?s=' + params.s)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

function fetchIngredientList(){
    return (     
        fetch('https://thecocktaildb.com/api/json/v2/'+ API_KEY+ '/list.php?i=list').then(treatHTTPResponseACB).then(transformResultACB));
}

function searchDrinkByIngredient(params){
       
    return (        
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/filter.php?i=' + params.i)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

function getAllIngredients(){
    function treatHTTPResponseACB(response){ 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(result) {
        return Object.values(result)[0];
    }

    return (        
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(treatHTTPResponseACB).then(transformResultACB));
}

function getAllAlcohols(){
    function treatHTTPResponseACB(response){ 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(result) {
        return Object.values(result)[0];
    }

    return (        
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
        .then(treatHTTPResponseACB).then(transformResultACB));
}

export {searchDrinkByIngredient, searchDrinkByName, fetchIngredientList, getDrinkDetails, generateRandomDrink, getAllIngredients, getAllAlcohols}

