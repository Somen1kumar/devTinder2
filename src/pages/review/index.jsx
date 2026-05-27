import React, { useEffect, useState } from "react";
import RedirectLogic from "@/utils/redirectLogic";
import fetchData from "@/utils/fetchData";
import { FEED_FETCH } from "@/utils/constants";
import ProfileCard from "@/components/Card/index";

const Review = () => {
  const { loginCredentials } = RedirectLogic();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [emptyConnectionReqMessage, setEmptyConnectionReqMessage] =
    useState("");





    const onConnectionRequest = async (_id, status) => {
        const newAPIURL = `${FEED_FETCH}/${status}/${_id}`;
        const updateStatus = await fetchData(newAPIURL, "POST");
        if(!updateStatus?.errorCode) {

            const newArr = data?.filter(item => item?.fromUserId?._id.toString() !== _id.toString());
            setFilterData(newArr);
            setEmptyConnectionReqMessage("All Pending Request is UpToDate");
        }
        console.log(_id, status);

    }
    useEffect(() => {
    const fetchReview = async () => {
      const reviewResponce = await fetchData(FEED_FETCH, "GET");
      console.log(reviewResponce);
      if (reviewResponce?.newConnectionRequest.length > 0) {
        setData(reviewResponce.newConnectionRequest);
        setFilterData(reviewResponce.newConnectionRequest);
        setEmptyConnectionReqMessage("");
      } else {
        setEmptyConnectionReqMessage("Oops No Request is Received");
      }
    };
    fetchReview();
  }, []);

  return (
    <div
      className="
    right flex flex-col gap-4 overflow-auto my-4 lg:w-[50vw] lg:h-[98vh] m-auto
    "
    >
      {filterData?.length > 0 ? (
        filterData.map((item) => (
          <React.Fragment key={item._id}><ProfileCard reviewFlag={true} feedData={item.fromUserId} onConnectionRequest={onConnectionRequest} /></React.Fragment>
        ))
      ) : (
        <div className="m-auto text-red-600">{emptyConnectionReqMessage}</div>
      )}
    </div>
  );
};

export default Review;
