function SearchResults(props){

    // console.log(props.searchResults)
    //function showResultACB(result){
        
        /*function choseResultACB(){
            // dish click should navigate to Details
            //window.location.hash = "#details";
            //props.onChosenResult(result);
            
        }
        return (
            <span onClick={choseResultACB} class = "dish">
                <img src={"https://spoonacular.com/recipeImages/"  + result.image } height={'100'}></img>
                <div>{result.title}</div>
            </span>
        )
    }*/
    return (
        <div>
            {/* {props.searchResults.map(showResultACB)} */}
            {props.searchResults[0]['strDrink']}
        </div>
    )
}

export default SearchResults;