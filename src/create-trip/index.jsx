import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AI_PROMT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { generateGeminiJSON } from "@/service/GeminiAI";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { chatSession } from "@/service/AIModel";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFromData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(name, value) {
    setFromData({
      ...formData,
      [name]: value,
    });
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),

    onError: (error) => console.log("error detected in login", error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 10 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMT = AI_PROMT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("Final prompt:", FINAL_PROMT);

    const result = await generateGeminiJSON(FINAL_PROMT);
    console.log(result);
    setLoading(false);
    SaveAiTrip(result);

    if (Array.isArray(result)) {
      result.forEach((day, index) => {
        console.log(`Day ${index + 1}:`, day);
      });
    } else {
      console.log("Raw AI Output:", result);
    }
  };

  // save to firebase
  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: TripData, //
      userEmail: user?.email,
      userName: user?.given_name,
      id: docId,
    });
    navigate("/view-trip/" + docId);
    setLoading(false);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User saved:", response.data);
        console.log(response.data);
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  useEffect(() => {}, [formData]);
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
            apiKey="AIzaSyB4OG0p4x7QZRHAPKKSSfW15A0Lidx8hA8"
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
              const isSelected = formData.traveller === item.title;

              return (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveller", item.title)}
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
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="!bg-black"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "   Generate trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                className="h-16 w-52 bg-cover"
                src="/public/logoimg.png"
                alt=""
              />
              <DialogTitle className="font-bold text-lg mt-7">
                Sign in with Google
              </DialogTitle>
              <DialogDescription>
                Sign in to the app with Google Authentication secuirity
              </DialogDescription>
              <Button
                onClick={login}
                className="!bg-black my-2 hover:text-green-50 text-gray-200 w-full flex items-center gap-4"
              >
                <FaGoogle className="h-7 w-7" /> Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
