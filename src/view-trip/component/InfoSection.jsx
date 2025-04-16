import { Button } from "@/components/ui/button";
import React from "react";
import { CiShare2 } from "react-icons/ci";
function InfoSection({ trip }) {
  console.log(trip);
  return (
    <div>
      <h3 className="text-right my-2.5">
        UserName: <span className="font-bold">{trip.userName}</span>
      </h3>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src="/tripImg.jpg"
        alt="tripImg"
      />
      <div className="flex justify-between items-center flex-wrap">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-4 flex-wrap">
            <h2 className="p-1 px3 rounded-full bg-gray-200 text-gray-500 text-xs ">
              📅
              {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px3 bg-gray-200 text-gray-500 rounded-full text-xs ">
              🤑 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px3 bg-gray-200 text-gray-500 rounded-full text-xs ">
              🥂 Number of Traveler: {trip.userSelection?.traveller}
            </h2>
          </div>
        </div>
        <Button className="!bg-black">
          <CiShare2 />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
