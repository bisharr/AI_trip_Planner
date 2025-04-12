import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFromData] = useState([]);

  function handleInputChange(name, value) {
    setFromData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference 🌴🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will
        generatate customised itenary based on your preference
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium ">
            What is your destination of your choice
          </h2>
          <GooglePlacesAutocomplete
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium ">
            How many days are you planning your trip ?
          </h2>
          <Input
            placeholder="Exp.3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium ">What is your Budget ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => {
              const isSelected = formData.budget === item.title;

              return (
                <div
                  onClick={() => handleInputChange("budget", item.title)}
                  key={index}
                  className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg transition-all duration-200
        ${isSelected ? "border-[3px] border-blue-400" : "border-gray-300"}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium ">
            Who do you plan on travelling with on your next adventure ?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => {
              const isSelected = formData.noOfPeople === item.title;

              return (
                <div
                  key={index}
                  onClick={() => handleInputChange("noOfPeople", item.title)}
                  className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg transition-all duration-200
        ${isSelected ? "border-[3px] border-blue-400" : "border-gray-300"}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-10 my-10">
        <Button className="!bg-black">Generate trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
