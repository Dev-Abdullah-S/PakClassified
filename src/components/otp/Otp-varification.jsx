import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
const API_URL = import.meta.env.VITE_API_URL;

export default function OtpPage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email & userId from signup redirect
  const email = location.state?.email || "";
  const userId = location.state?.userId || "";

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }

      // Auto-submit when last input is filled
      if (index === 5 && value) {
        handleVerifyOtp(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (finalOtp) => {
    if (!finalOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otpCode: finalOtp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Email verified successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
   <>
     <Container fluid className="px-0 catagories-container">
             <div className="catagoies-img">
               <img src="/PakClassified/Images/g-wagon-black.png" alt="" />{" "}
             </div>
             <div className="c-d-1"></div>
             <div className="c-d-2"></div>
             <div className="c-d-3"></div>
             <h1 className="adv-c-heading">Email Varification</h1>
           </Container>
    <div className="otp-container">
      <h2 className="mx-2 mt-2">Email Verification</h2>
      <p className="mx-2 mt-2">
        We sent a verification code to your email: <b>{email}</b>
      </p>

      <div className="mb-5" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="otp-input"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "30px",
              textAlign: "center",
            }}
          />
        ))}
      </div>

      <button 
        onClick={() => handleVerifyOtp(otp.join(""))}
        className="otp-btn"
        style={{ marginTop: "20px" , display : 'none' }}
      >
        Verify OTP
      </button>

      {/* Toastify container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
    </>
  );
}
