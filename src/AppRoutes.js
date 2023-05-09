import React from "react";
import HomePage from "./pages/HomePage";
import Protected from "./util/Protected";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import { useStateValue } from "./StateProvider";
import BookingPage from "./pages/BookingPage";

function AppRoutes() {
  const [state, dispatch] = useStateValue();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <Protected isSignedIn={state.isLoggedIn}>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/booking"
          element={
            <Protected isSignedIn={state.isLoggedIn}>
              <BookingPage />
            </Protected>
          }
        />
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
