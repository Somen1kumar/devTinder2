



const fetchData = async (url , type, bodyData = {}) => {
    let newUrl = "";

    let defaultConfigs = {
        method: type,
        credentials: "include",
    };
    if(window.location.hostname === "localhost") {
        newUrl = `http://localhost:3000${url}`
    } else {
        newUrl = `/api${url}`
    }

    if(type === "POST" || type === "PATCH") {
        defaultConfigs = {
            method: type,
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(bodyData)
        }
    }

    const fetcher = await fetch(newUrl, defaultConfigs);
    const responce = await fetcher.json();

    if(!responce.errorCode) {
        return responce;
    } else {
        console.error("login Error", responce.errorMessage);
        return responce.errorCode;
    }
};


export default fetchData;