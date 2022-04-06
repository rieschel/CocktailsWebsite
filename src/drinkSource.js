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

function getDrinkDetails(drinkid){
    console.log("inside get dish details")
    function treatHTTPResponseACB(response){ 
        if (response.status!==200 ) throw "API problem";     // or response.status!==200 
        console.log("testingtesting")
        //console.log(response.json());
        return response.json();
    }

    function transformResultACB(results) {
        //return param.results;
        console.log("TEST")
        console.log(Object.values(results)[0][0])
        //console.log(Object.values(results)[0])
        //return Object.values(results)[0];
        return Object.values(results)[0];
    }


    /*return (
        fetch(BASE_URL + "/recipes/" + dishid + "/information", {
	        "method": "GET",
	        "headers": {
                "X-Mashape-Key": API_KEY,
		        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	        }
        })
        .then(treatHTTPResponseACB));
        www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007*/
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
    console.log("HEJ")
    console.log(Object.values(results)[0])
    return Object.values(results)[0];
}

function searchDrinkByIngredient(params){
    console.log(params.i)
       
    return (        
        fetch('https://www.thecocktaildb.com/api/json/v2/' + API_KEY + '/filter.php?i=' + params.i)
        .then(treatHTTPResponseACB).then(transformResultACB));
} 

export {searchDrinks, searchDrinkByIngredient, getDrinkDetails}