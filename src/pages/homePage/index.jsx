import { X } from "lucide-react";
import RedirectLogic from '@/utils/redirectLogic';
import ProfileCard from '@/components/Card/index';
import SlickSlider from 'react-slick/lib/slider';
import FeedFetch from '@/hooks/useFeedFetch';
import { FEED_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchData from '@/utils/fetchData';
import { SENT_CONNECTION } from '@/utils/constants';

function HomePage() {
    const {loginCredentials} = RedirectLogic();
    const {feedData, currentFeed, setCurrentFeed} = FeedFetch(FEED_URL);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    // const Slider = SlickSlider.default || SlickSlider;
    const onConnectionRequest = async (toUser,status) => {
      const newConnectionURL = `${SENT_CONNECTION}/${status}/${toUser}`;
      console.log(newConnectionURL)
      const sendConnection = await fetchData(newConnectionURL, "POST");
      if(!sendConnection?.errorCode){
        setCurrentFeed(feedData[currentIndex + 1]);
        setCurrentIndex(prev => prev + 1);
        // setCurrentIndex(prev => prev + 1);
      } else {
        setErrorMessage("Oops Something went wrong");
      }
    }
    const onErrorClosePopUp = (e) => {
      e.preventDefault();
    setErrorMessage("");
    }

  return (
      <div className='right flex flex-col gap-4 overflow-auto my-4 lg:w-[50vw] lg:h-[98vh] m-auto'>
        {/* {feedData?.map((feed) => (
          <ProfileCard key={feed._id} feedData={feed} />
        ))} */}
        {errorMessage && <div className="absolute text-center flex bg-red-500 text-white w-fit p-3 justify-between pl-12 rounded-full z-[99] lg:min-w-[400px]">
          {errorMessage}
          <button onClick={onErrorClosePopUp}>
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
          </div>}
        {currentFeed &&<ProfileCard feedData={currentFeed} onConnectionRequest={onConnectionRequest}/>}
        {/* Passing configuration settings to the Slider wrapper */}
      {/* <Slider {...settings}>
        {slideData?.map((slide) => (
          <ProfileCard key={slide.id} title={slide.title} bgImage={slide.img} />
        ))}
      </Slider> */}
      </div>
  )
}

export default HomePage;
