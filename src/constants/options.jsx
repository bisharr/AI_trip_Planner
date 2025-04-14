export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandom",
    icon: "🍷",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "🚢",
    people: "5 t0 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay concious of costs",
    icon: "💶",
  },
  {
    id: 2,
    title: "modarate",
    desc: "keep cost on the everage side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "🤑",
  },
];

export const AI_PROMT =
  "Generate Travel Plan for location : {location}, for {totalDays} days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address  Price, Hotel Image url, geo coordinates, rating,description and suggest itinery with placeName, place details, Place image url geoCoordinates, ticket price,raing, Time travel each of the location for {totalDays}  days with  each day plan with the best time to visit in JSON FORMAT";
