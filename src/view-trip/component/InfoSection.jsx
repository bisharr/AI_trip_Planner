import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApiServices";
import React, { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
const PHOTO_REQUEST_URL_PRIVATE =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8";
function InfoSection({ trip }) {
  const [coverImg, setCoverImg] = useState(null);
  // console.log(trip);
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };

      const res = await GetPlaceDetails(data);

      const PhotoUrl = PHOTO_REQUEST_URL_PRIVATE.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setCoverImg(PhotoUrl);
      console.log(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error?.response || error);
    }
  };
  return (
    <div>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={coverImg}
        alt="tripImg"
      />

      {/* fetching actual and real img */}
      {/* <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={`https://source.unsplash.com/600x400/?${encodeURIComponent(
          trip?.userSelection?.location?.label
        )},landscape&sig=${encodeURIComponent(
          trip?.userSelection?.location?.label
        )}`}
      /> */}

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
