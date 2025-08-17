import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl, setUserData } = useContext(UserDataContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(result.data);
      toast.success("Signin successful!");
      setLoading(false);
    } catch (err) {
      const backendMsg = err.response?.data?.message || "Signin failed";
      toast.error(backendMsg);
      console.error("Signin Error:", err);
      setUserData(null);
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center px-3 sm:px-6"
      style={{ backgroundImage: `URL(${bg})` }}
    >
      <form
        className="w-full max-w-[95%] sm:max-w-[500px] min-h-[480px] sm:min-h-[550px] md:h-[600px] 
        backdrop-blur-xl bg-white/10 shadow-2xl shadow-black/50 
        flex flex-col items-center justify-center gap-4 sm:gap-6 px-5 sm:px-8 rounded-2xl border border-white/20"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold text-center leading-snug">
          Sign In to{" "}
          <span className="text-[#55ff00]">Virtual Assistant</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[48px] sm:h-[55px] md:h-[60px] outline-none border border-white/40 
          bg-white/10 text-white placeholder-gray-300 px-4 rounded-full 
          text-sm sm:text-base md:text-[17px] focus:border-[#55ff00] transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative w-full h-[48px] sm:h-[55px] md:h-[60px] border border-white/40 bg-white/10 rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 
            px-4 pr-10 text-white text-sm sm:text-base md:text-[17px] focus:border-[#55ff00] transition"
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
          className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] h-[48px] sm:h-[55px] md:h-[60px] 
          text-black font-semibold bg-gradient-to-r from-[#55ff00] to-[#a8ff78] 
          rounded-full text-sm sm:text-base md:text-[18px] mt-5 cursor-pointer 
          shadow-md hover:shadow-lg active:scale-95 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* Link */}
        <p
          className="text-gray-200 text-xs sm:text-sm md:text-[16px] text-center mt-4"
        >
          Want to create a new account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
