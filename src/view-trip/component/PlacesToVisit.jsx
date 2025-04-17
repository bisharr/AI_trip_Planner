import { GetPlaceDetails } from "@/service/GlobalApiServices";
import React, { useEffect, useState } from "react";

const PHOTO_REQUEST_URL_PRIVATE =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8";

function PlacesToVisit({ place }) {
  const itinerary = place.TripData?.travelPlan?.itinerary;
  const [placePhotoImgs, setPlaceImg] = useState([]);

  // Convert itinerary into structured array
  const itineraryDays = itinerary
    ? Object.entries(itinerary).map(([day, info]) => ({
        day,
        locations:
          info.locations || info.activities || info.places || info.plan || [],
        bestTimeToVisit: info.bestTimeToVisit || "Anytime",
      }))
    : [];

  // Fetch photo for each location name
  async function fetchAllPlacePhotos() {
    try {
      const photos = await Promise.all(
        itineraryDays.map(async (item) => {
          // Get a name to query — first location or fallback
          const firstPlaceName =
            item.locations?.[0]?.name || item.locations?.[0] || "Unknown Place";

          const data = { textQuery: firstPlaceName };
          const res = await GetPlaceDetails(data);
          const photoName = res?.data?.places?.[0]?.photos?.[3]?.name;

          if (photoName) {
            return PHOTO_REQUEST_URL_PRIVATE.replace("{NAME}", photoName);
          }

          return null;
        })
      );

      setPlaceImg(photos);
    } catch (error) {
      console.error("Error fetching photos:", error?.response || error);
    }
  }

  useEffect(() => {
    if (place && itineraryDays.length > 0) {
      fetchAllPlacePhotos();
    }
  }, [place, itinerary]);

  return (
    <div className="mt-6">
      <h2 className=" font-bold text-2xl my-6 text-gray-800 text-left">
        Places To Visit
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12">
        {Object.entries(itineraryDays || {}).map(([day, info], index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600">
              {day.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-500">
              ⏰ Best Time:{" "}
              <span className="text-orange-500 font-medium">
                {info?.bestTimeToVisit}
              </span>
            </p>

            {info?.locations?.map((place, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <img
                  src={placePhotoImgs[index]}
                  alt={place.placeName}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {place.placeName}
                  </h3>
                  <p className="text-sm text-gray-600">{place.placeDetails}</p>

                  <div className="text-xs text-gray-700 space-y-1">
                    <p>💸 Ticket: ${place.ticketPrice}</p>
                    <p>🕓 Travel Time: {place.timeTravel}</p>
                    <p>⭐ Rating: {place.rating}</p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.geoCoordinates?.latitude},${place.geoCoordinates?.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline inline-block pt-2"
                  >
                    📍 Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
