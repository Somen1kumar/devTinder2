

import React from 'react'
import useGetAllConnection from '@/hooks/useGetAllConnection';
import { GET_MUTUAL_CONNECTIONS } from '@/utils/constants';
import MutualConnectionCard from '../../components/MutualConnectionCard';

const ReviewAllConnections = () => {
    const {data, loading, errorMessage} = useGetAllConnection(GET_MUTUAL_CONNECTIONS);

    if(loading) return <div>...Loading</div>
    if(errorMessage) return <div>{errorMessage}</div>

  return (
    <div className='flex flex-col h-[95vh] my-4 overflow-auto'>
        {data?.map((item) => <MutualConnectionCard key={item._id} feedData={item}/>)}
    </div>
  )
}

export default ReviewAllConnections;
