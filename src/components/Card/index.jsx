import React from "react";
import { Check, X } from "lucide-react";

const ProfileCard = (props) => {
    const {feedData, onConnectionRequest, reviewFlag=false} = props;
    const LABELS = {
        interested: "Interested",
        ignore: "Ignore",
        accepted: "Accepted",
        rejected: "Rejected"
    }
    let ALLOWED_STATUS = ["ignored", "interested"];
    if(reviewFlag) {
        ALLOWED_STATUS = ["rejected", "accepted"];
    }
  const { firstName, lastName, photoUrl, description, _id } = feedData;
  const onClickHandler = (e, status) => {
    e.preventDefault();
    if(ALLOWED_STATUS.includes(status)) {
        onConnectionRequest(_id, status);
    }
  }
  return (
    <div className="relative w-[90vw] h-[85vh] m-auto lg:w-[33vw] lg:min-h-[96vh] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
      {/* 1. The Background Image */}
      <img
        src={photoUrl}
        alt="User profile"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. The Gradient Overlay (Fades to black at the bottom) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* 3. The Text Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold tracking-wide">
          {`${firstName} ${lastName}`}
        </h3>
        <p className="text-sm text-gray-200 mt-1 font-medium opacity-90">
          {description}
        </p>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={(e) => onClickHandler(e, reviewFlag ? "accepted" :"interested")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
                   text-sm font-semibold text-white bg-emerald-600 rounded-xl
                   border border-emerald-600 shadow-sm transition-all duration-200 
                   hover:bg-emerald-700 hover:border-emerald-700
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            {reviewFlag ? LABELS.accepted : LABELS.interested}
          </button>
          <button
            type="button"
            onClick={(e) => onClickHandler(e, reviewFlag? "rejected" : "ignored")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
                   text-sm font-semibold text-red-600 bg-red-50 rounded-xl
                   border border-red-200 shadow-sm transition-all duration-200 
                   hover:bg-red-600 hover:text-white hover:border-red-600
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
            {reviewFlag ? LABELS.rejected: LABELS.ignore}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
