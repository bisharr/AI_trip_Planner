import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

// API expects field mask as a string, **not** array
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8",
    "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
  },
};

// This sends the POST request to Google's Places Text Search API
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
// export const PHOTO_REQUEST_URL =
//   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8";
