import React from "react";

function Hotels({ hotelData }) {
  console.log(hotelData);
  console.log(hotelData.travelPlan);
  console.log(hotelData.travelPlan?.hotels);
  const hotelList =
    hotelData.travelPlan?.hotels ||
    hotelData.travelPlan?.hotelOptions ||
    hotelData?.hotels ||
    [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommended</h2>

      {hotelList.map((items, index) => (
        <div
          key={index}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 items-center"
        >
          <h2 className="text-2xl font-bold text-gray-500">
            {items.hotelName}
          </h2>
          <img
            className="h-[300px] w-full object-cover rounded-xl"
            // src="/tripImg.jpg"
            src={items.hotelImageUrl && "/noimg.png"}
            alt="tripImg"
          />
          <h2 key={index}>{items.description}</h2>
        </div>
      ))}
    </div>
  );
}

export default Hotels;
