function promiseNoData(promiseState){
    // console.log("inside promise no data")
    // console.log(promiseState)
    if(!promiseState.promise){
        return (<div></div>);
    }
    else if(promiseState.data == "No cocktails with this name"){
        return (<div>{promiseState.data}</div>)
    }
    else if (!promiseState.data && !promiseState.error){
        return( <img src = "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" height={'50'}></img>)
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
    console.log("end of promise no data")
}

export default promiseNoData;