import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import DestinationDetails from "./pages/DestinationDetails";
import Vehicles from "./pages/Vehicles";
import TourDetails from "./pages/TourDetails";
import UpdateTour from "./components/featuredTours/UpdateTours";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import UpdateDestination from "./pages/UpdateDestination";
import HotelDetails from "./components/hotelpages/HotelDetails";
import InputHotel from "./components/hotelpages/InputHotel";
import UpdateVehicle from "./components/VehicleComp/UpdateVehicle";
import NavigationBar from "./components/NavigationBar";
import CustomizeForm from "./pages/CustomizeForm";
import OurServices from "./pages/OurServices";
import WriteReview from "./components/Review/write";
import ReviewsSection from "./components/Review/ReviewComp";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
    <div className="pt-[4rem] body-color"> {/* Added padding to prevent navbar overlap */}

        <Routes>
          <Route path="/services" element={<OurServices />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/reviews" element={<ReviewsSection />} />
          <Route path="/destinations/:destSlug" element={<DestinationDetails />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customize" element={<CustomizeForm />} />
          </Route>

          {/* Admin-Only Routes */}
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/update-destination/:destId" element={<UpdateDestination />} />
            <Route path="/update-vehicle/:vehicleId" element={<UpdateVehicle />} />
          </Route>

          {/* Other Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/update-tour/:tourId" element={<UpdateTour />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/add-hotel" element={<InputHotel />} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    
  );
}
