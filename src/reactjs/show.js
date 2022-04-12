import React from "react";

function Show(props){
    const [hashState, setHash] = React.useState(window.location.hash);

    function onCreateACB() {

        function onHashChangeACB(event) { setHash(window.location.hash)}
        window.addEventListener("hashchange", onHashChangeACB);
        return function tearDownACB() { window.removeEventListener("hashchange", onHashChangeACB)};
    }
    React.useEffect(onCreateACB, []);

    return hashState !== props.hash || <div>{props.children}</div>;
}

export default Show;