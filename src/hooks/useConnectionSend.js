import { useCallback, useEffect, useState } from "react"
import fetchData from "@/utils/fetchData";


const SendConnectionRequest = (URL) => {

    const [feedData, setFeedData] = useState([]);

    const fetchConnectionRequest = useCallback(async () => {
        const fetcher = await fetchData(URL, "POST");
        if(fetcher) {
            setFeedData(fetcher?.user);
        }
    },[URL])

    useEffect(() => {
        fetchConnectionRequest();
    },[fetchConnectionRequest]);

    return {
        feedData,
    }
}

export default SendConnectionRequest;
