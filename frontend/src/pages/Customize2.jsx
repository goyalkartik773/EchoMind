import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(UserDataContext);
  const [AssistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    // Validation
    if (!AssistantName.trim()) {
      toast.error("Please enter an assistant name");
      return;
    }

    if (!backendImage && !selectedImage) {
      toast.error("Please select an assistant image first");
      navigate("/Customize");
      return;
    }

    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("AssistantName", AssistantName.trim());

      if (backendImage) {
        formData.append("AssistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      console.log("Sending request to create assistant...");
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      console.log("Assistant created successfully:", result.data);

      // Update user data in context
      setUserData(result.data);

      setLoading(false);

      // Show success message
      toast.success("Assistant created successfully!");

      // Small delay to ensure state updates before navigation
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (err) {
      console.error("Error creating assistant:", err);
      setLoading(false);

      // Show specific error message
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create assistant. Please try again.";

      toast.error(errorMessage);

      // Log detailed error for debugging
      console.error("Error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0f051d] via-[#0c0846] to-[#010e1a] flex flex-col justify-center items-center px-4 py-10">
      {/* Back Button */}
      <IoArrowBackOutline
        className="absolute top-[20px] left-[20px] sm:top-[30px] sm:left-[30px] text-white h-[22px] w-[22px] sm:h-[25px] sm:w-[25px] cursor-pointer"
        onClick={() => {
          navigate("/Customize");
        }}
      />

      {/* Heading */}
      <h1 className="text-white text-[22px] sm:text-[26px] md:text-[30px] text-center mb-[20px] sm:mb-[30px] px-2">
        Enter Your <span className="text-[dodgerblue]">EchoMind Assistant Name</span>
      </h1>

      {/* Input */}
      <input
        type="text"
        placeholder="eg: viveki"
        className="w-full max-w-[90%] sm:max-w-[600px] h-[50px] sm:h-[60px] outline-none border-2 border-[white] bg-transparent text-[#f3f4f3] placeholder-gray-300 px-[15px] sm:px-[20px] py-[10px] rounded-full text-[16px] sm:text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={AssistantName}
      />

      {/* Button */}
      {AssistantName && (
        <button
          className={`min-w-[200px] sm:min-w-[250px] md:min-w-[300px] h-[50px] sm:h-[55px] md:h-[60px] text-black font-semibold bg-white rounded-full text-[16px] sm:text-[18px] md:text-[19px] mt-[40px] sm:mt-[50px] md:mt-[60px] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
            }`}
          onClick={handleUpdateAssistant}
          disabled={loading}
        >
          {!loading ? "Finally Create Your Assistant" : "Creating..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
