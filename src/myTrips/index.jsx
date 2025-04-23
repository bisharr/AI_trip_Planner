import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    GetUsersTrips();
  }, []);
  const GetUsersTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div>
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
