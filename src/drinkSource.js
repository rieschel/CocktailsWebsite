import {BASE_URL, API_KEY} from "/src/apiConfig.js"

/*function searchDrinks(){
    console.log("inside get drinks")
    function treatHTTPResponseACB(response){ 
        if(!response.ok) throw "API problem";     // or response.status!==200 
        console.log(response.json)
        return response.json();
    }
    return (
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
            .then((json) => {
                console.log(Object.values(json))
                return Object.values(json)[0];
            })
    )
}*/




function searchDrinks(){
    
    function treatHTTPResponseACB(response) { 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        return response.json();
    }

    function transformResultACB(results) {
        //return param.results;
        console.log(Object.values(results)[0])
        return Object.values(results)[0];
    }

   
    return ( 
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/random.php')
        .then(treatHTTPResponseACB).then(transformResultACB));
}

function treatHTTPResponseACB(response) { 
    if (response.status!==200 ) throw "API problem";     // or response.status!==200 
    console.log("treat response")
    console.log(response)
    return response.json();
}

function transformResultACB(results) {
    //return param.results;
    console.log("transforming API results")
    console.log(Object.values(results)[0])
    return Object.values(results)[0];
}

function searchDrinkByName(params){
    /* console.log(params.s) */
    console.log("list of ingredients")
    return (     
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/search.php?s=' + params.s)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

function fetchIngredientList(){
    return (     
        fetch('https://thecocktaildb.com/api/json/v2/'+ API_KEY+ '/list.php?i=list').then(treatHTTPResponseACB).then(transformResultACB));
}

function searchDrinkByIngredient(params){
    console.log(params.i)
       
    return (        
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/filter.php?i=' + params.i)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

export {searchDrinks, searchDrinkByIngredient, searchDrinkByName, fetchIngredientList}