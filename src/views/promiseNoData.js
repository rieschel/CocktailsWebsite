function promiseNoData(promiseState){
    if(!promiseState.promise){
        return (<div>no data</div>);
    }
    else if (!promiseState.data && !promiseState.error){
        //TODO: Borde vara laddningssymbol, men skriver man ett namn på en cocktail som inte finns så går den in här.
        //return( <img src = "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" height={'50'}></img>)
        return(<div>No cocktails.</div>)
    }
    else if(!promiseState.data && promiseState.error){
        return (<div>{promiseState.error}</div>);
    }
    else if (promiseState.data == "None Found"){
        return(<div>No cocktails with these ingredients.</div>)
    }
    else if (promiseState.data && !promiseState.error){
        return false;
    }
}

export default promiseNoData;