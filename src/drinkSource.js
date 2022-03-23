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
        
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(treatHTTPResponseACB).then(transformResultACB));
}

export {searchDrinks}