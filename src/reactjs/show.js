function Show(props){
    const [hashState, setHash] = React.useState(props.hash);

    function hashListenerACB(){
        setHash(window.location.hash);
    }

    function wasCreatedACB(){
        window.addEventListener("hashchange", hashListenerACB);

        return tearDownACB;
    }

    function tearDownACB(){
        window.removeEventListener("hashchange", hashListenerACB);
    }
    React.useEffect(wasCreatedACB, []);

    function defineClass(){
        if(hashState != props.hash){
            return "hidden";
        }
        else{
            return "none";
        }
    }

    return(
        <div class = {defineClass()}>
            {props.children}
        </div>);
}

export default Show;