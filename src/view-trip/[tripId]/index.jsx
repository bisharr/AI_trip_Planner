import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "sonner";
import InfoSection from "../component/infoSection";
import Hotels from "../component/Hotels";
import PlacesToVisit from "../component/PlacesToVisit";
import Footer from "../component/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);

  //   use to get Trip Info from fireBase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHotelsData(docSnap.data().TripData);
      setTrip(docSnap.data());
    } else {
      Toaster("No trip found");
    }
  };

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  return (
    <div className="p-10 md:px-44 xl:px-56">
      {/* Information section */}
      <InfoSection trip={trip} />

      {/*Recommended Hotels  */}
      <Hotels hotelData={hotelsData} />

      {/* Daily Plan */}
      <PlacesToVisit place={trip} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ViewTrip;
