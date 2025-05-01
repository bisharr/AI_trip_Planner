import { GetPlaceDetails } from "@/service/GlobalApiServices";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PHOTO_REQUEST_URL_PRIVATE =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8";

function UserTripCardItem({ trip }) {
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
  console.log(trip);
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          src={coverImg}
          alt="img"
          className=" object-cover rounded-xl h-70"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
