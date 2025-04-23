import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import CreateTrip from "./create-trip";
import Header from "./custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]";
import MyTrips from "./myTrips";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create-trip",
    element: <CreateTrip />,
  },

  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-Trips",
    element: <MyTrips />,
  },
  {
    basename: "/",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="95052078681-ncd843e04r6i3u53hjh57927ksn0guca.apps.googleusercontent.com">
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
