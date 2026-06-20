import React from "react";
import './index.css'
import { useNavigate } from "react-router";

const MutualConnectionCard = (props) => {
  const { firstName, lastName, photoUrl, description, _id } = props.feedData;
  const currentLoggedInData = sessionStorage.getItem("currentLoggedInUser");
  let navigate = useNavigate();
    const currentuserId = JSON.parse(currentLoggedInData)?.id;
    const finalId = `${_id}_${currentuserId}`;
    const onClickHandler = (e) => {
        e.preventDefault();
        sessionStorage.setItem("chattingInfo", JSON.stringify(props.feedData));
        navigate(`/chat/${finalId}`);
    }
  return (
    <div key={_id} className="w-[100vw] lg:w-[73vw]">
      <div className="flex m-auto w-[95vw] lg:w-[60vw] p-4 gap-4 mt-4 bg-red-500 rounded-2xl">
        <div className="image-container w-[30%]">
          <img src={photoUrl} alt={description} className=" rounded-tl-xl rounded-bl-xl object-cover aspect-[1.54] lg:aspect-[1.78] h-[stretch]" />
        </div>
        <div className="right-container w-[70%]">
            <div className="flex justify-between h-full">
                <div className="flex flex-col gap-3 w-[80%] my-auto">
                    <h3 className="text-xl font-bold font-sans lg:text-2xl">{`${firstName} ${lastName}`}</h3>
                    <p className="text-sm lg:text-base">{description}</p>
                </div>
                <button onClick={onClickHandler} className=""><span className="icon-bubbles3 text-3xl m-auto pr-3 cursor-pointer"></span></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MutualConnectionCard;
