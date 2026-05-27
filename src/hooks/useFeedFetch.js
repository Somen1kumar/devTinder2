import { useCallback, useEffect, useState } from "react"
import fetchData from "@/utils/fetchData";


const FeedFetch = (URL) => {

    const [feedData, setFeedData] = useState([]);
    const [currentFeed, setCurrentFeed] = useState({});

    const fetchFeedData = useCallback(async () => {
        const fetcher = await fetchData(URL, "GET");
        if(fetcher) {
            setFeedData(fetcher?.user);
            setCurrentFeed(fetcher?.user[0]);
        }
    },[URL])

    useEffect(() => {
        fetchFeedData();
    },[fetchFeedData]);

    return {
        feedData,
        currentFeed,
        setCurrentFeed,
        setFeedData
    }
}

export default FeedFetch;