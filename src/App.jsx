import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import Cardetail from "./pages/Cardetail";
import OTP from "./pages/otp";
import Userprofile from "./pages/userprofile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="Car_details" element={<Cardetail />} />
          <Route path="otp-varification" element={<OTP />} />
          <Route path="UserDashboard" element={<Userprofile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
