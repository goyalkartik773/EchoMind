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
          <span className="text-[#55ff00]">EchoMind</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[48px] sm:h-[55px] md:h-[60px] outline-none border border-white/40 
          bg-white/10 text-white placeholder-gray-100 px-4 rounded-full 
          text-sm sm:text-base md:text-[17px] focus:border-[#55ff00] transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative w-full h-[48px] sm:h-[55px] md:h-[60px] border border-white/40 bg-white/10 rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-100 
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

        {/* Demo Section - Bold Green Theme */}
        <div className="w-full mt-6 p-5 bg-gradient-to-br from-green-500/25 to-emerald-500/25 
          border-2 border-[#55ff00]/60 rounded-2xl shadow-xl shadow-green-500/40">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#55ff00]/30 
              rounded-full mb-3 border-2 border-[#55ff00]/70">
              <svg className="w-6 h-6 text-[#55ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base mb-2">
              Try Before You Sign In
            </h3>
            <p className="text-gray-100 text-sm mb-4">
              Experience EchoMind instantly - no account required!
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/demo")}
            className="w-full py-3 bg-gradient-to-r from-[#55ff00] to-[#38f404] 
              text-black font-bold text-base rounded-xl
              hover:from-[#66ff11] hover:to-[#49ff15] hover:scale-[1.02]
              active:scale-95 transition-all duration-300 
              shadow-lg shadow-green-500/50 hover:shadow-green-400/60
              flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Launch Demo Now</span>
          </button>

          <p className="text-center text-gray-300 text-xs mt-3">
            Or{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[green] hover:text-[#66ff11] font-semibold underline"
            >
              create a free account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
