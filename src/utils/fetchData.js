



const fetchData = async (url , type, bodyData = {}) => {

    let defaultConfigs = {
        method: type,
        credentials: "include",
    };

    if(type === "POST" || type === "PATCH") {
        defaultConfigs = {
            method: type,
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(bodyData)
        }
    }

    const fetcher = await fetch(url, defaultConfigs);
    const responce = await fetcher.json();

    if(!responce.errorCode) {
        return responce;
    } else {
        console.error("login Error", responce.errorMessage);
        return responce.errorCode;
    }
};


export default fetchData;