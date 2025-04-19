import { GetPlaceDetails } from "@/service/GlobalApiServices";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PHOTO_REQUEST_URL_PRIVATE =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8";
function Hotels({ hotelData }) {
  const [coverImg, setCoverImg] = useState([]);
  const hotelList =
    hotelData.travelPlan?.hotels ||
    hotelData.travelPlan?.hotelOptions ||
    hotelData?.hotels ||
    hotelData.hotelOptions ||
    [];
  // const hotelNames = hotelList.map((item) => item.hotelName);
  // console.log(hotelNames);

  // console.log(trip);

  async function fetchAllHotelPhotos() {
    try {
      const photos = await Promise.all(
        hotelList.map(async (item) => {
          const data = { textQuery: item.hotelName };
          const res = await GetPlaceDetails(data);
          const photo = res?.data?.places?.[0]?.photos?.[3]?.name;
          if (photo) {
            return PHOTO_REQUEST_URL_PRIVATE.replace("{NAME}", photo);
          }
          return null;
        })
      );
      setCoverImg(photos);
    } catch (error) {
      console.error("Error fetching photos:", error?.response || error);
    }
  }

  useEffect(() => {
    if (hotelData) {
      fetchAllHotelPhotos();
    }
  }, [hotelData]);

  return (
    <div>
      <h2 className="font-bold text-2xl my-6 text-gray-800">
        Hotels Recommended
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-4 items-center">
        {hotelList.map((items, index) => (
          <div
            key={index}
            className="hover:scale-110 transition-all p-1.5 border shadow cursor-pointer duration-200  "
          >
            <img
              className="h-[280px] w-full object-cover rounded-xl"
              src={coverImg[index]}
              alt="tripImg"
            />

            <div className="my-2 flex flex-col gap-2">
              <h2 className="text-xl font-medium">
                <span className="text-gray-900">Hotel Name: </span>
                {items?.hotelName}
              </h2>

              {/* ✅ Only this part is clickable */}
              <Link
                to={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  items.hotelName +
                  encodeURIComponent(items?.hotelAddress)
                }
                target="_blank"
                className="text-xs font-medium text-blue-600 underline"
              >
                📍 {items?.hotelAddress}
              </Link>

              <h2 className="text-sm font-semibold ">
                💰 ${items?.price} per Night
              </h2>
              <h2 className="text-sm font-semibold ">
                ⭐ {items?.rating} Rating
              </h2>
            </div>
            <h2>
              <span className="font-bold">Desc</span>: {items?.description}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
