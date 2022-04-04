function promiseNoData(propmiseState){
    if(!propmiseState.promise){
        return (<div>no data</div>);
    }
    else if (!propmiseState.data && !propmiseState.error){
        return( <img src = "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" height={'50'}></img>)
    }
    else if(!propmiseState.data&& propmiseState.error){
        return (<div>{propmiseState.error}</div>);
    }
    else if (propmiseState.data && !propmiseState.error){
        return false;
    }
}

export default promiseNoData;