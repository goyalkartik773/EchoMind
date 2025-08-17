import React, { useContext, useState } from "react";
import bg from "../assets/authBg2.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { toast } from "react-toastify";
import Customize from "./Customize";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl, setUserData } = useContext(UserDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      toast.success("Signup successful!");
      setLoading(false);
      navigate("/Customize");
    } catch (err) {
      const backendMsg = err.response?.data?.message || "Signup failed";
      toast.error(backendMsg);
      console.error("Signup Error:", err);
      setUserData(null);
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundImage: `URL(${bg})` }}
    >
      <form
        className="w-full max-w-[95%] sm:max-w-[500px] min-h-[500px] sm:min-h-[550px] md:h-[600px] 
        backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-[#38f404]/40 
        flex flex-col items-center justify-center gap-4 sm:gap-6 px-5 sm:px-8 rounded-2xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold text-center leading-snug">
          Register to <span className="text-[#00ccff]">Virtual Assistant</span>
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[48px] sm:h-[55px] md:h-[60px] outline-none border border-white/40 
          bg-white/10 text-white placeholder-gray-300 px-4 rounded-full text-sm sm:text-base md:text-[17px] 
          focus:border-[#00ccff] transition"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[48px] sm:h-[55px] md:h-[60px] outline-none border border-white/40 
          bg-white/10 text-white placeholder-gray-300 px-4 rounded-full text-sm sm:text-base md:text-[17px] 
          focus:border-[#00ccff] transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative w-full h-[48px] sm:h-[55px] md:h-[60px] border border-white/40 bg-white/10 rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 
            px-4 pr-10 text-white text-sm sm:text-base md:text-[17px] focus:border-[#00ccff] transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword ? (
            <FiEyeOff
              className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-200 hover:text-white cursor-pointer transition"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <FiEye
              className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-200 hover:text-white cursor-pointer transition"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {/* Button */}
        <button
          className="min-w-[130px] sm:min-w-[150px] md:min-w-[160px] h-[48px] sm:h-[55px] md:h-[60px] 
          text-black font-semibold bg-gradient-to-r from-[#38f404] to-[#a8ff78] rounded-full 
          text-sm sm:text-base md:text-[18px] mt-5 cursor-pointer 
          shadow-md hover:shadow-lg active:scale-95 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Link */}
        <p className="text-gray-200 text-xs sm:text-sm md:text-[16px] text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
