

import React, { useCallback, useEffect, useState } from 'react'
import fetchData from '../utils/fetchData';

const useGetAllConnection = (URL) => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAPI = useCallback(async () => {
        try {
            setLoading(true);
            const fetcher = await fetchData(URL);
            if (fetcher?.errorMessage) {
                setErrorMessage(fetcher.errorMessage)
            } 
            if(fetcher) {
                console.log(fetcher?.data);
                setData(fetcher?.data);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }, [URL]);

    useEffect(() => {
        fetchAPI();
        
    },[fetchAPI])
  return {
    data,
    errorMessage,
    loading

  }
};

export default useGetAllConnection
