import React, {useRef, useContext } from "react";
import Card from "../components/Card";
import cover1 from "../assets/cover1.png";
import cover2 from "../assets/cover2.png";
import cover3 from "../assets/cover3.png";
import cover4 from "../assets/cover4.png";
import cover5 from "../assets/cover5.png";
import cover6 from "../assets/cover6.png";
import { IoArrowBackOutline, IoCloudUploadSharp } from "react-icons/io5";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";

function Customize() {
  const {
    frontendImage,
    setFrontendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);

  const inputImage = useRef();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f051d] via-[#0c0846] to-[#010e1a] flex flex-col justify-center items-center px-4 py-10">
      <IoArrowBackOutline
        className="absolute top-5 left-5 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

      {/* Heading */}
      <h1 className="text-white text-2xl sm:text-3xl md:text-[32px] text-center mb-8">
        Select Your <span className="text-[dodgerblue]">Assistant Image</span>
      </h1>

      {/* Cards */}
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] flex justify-center items-center flex-wrap gap-4 sm:gap-6">
        <Card image={cover1} />
        <Card image={cover2} />
        <Card image={cover3} />
        <Card image={cover4} />
        <Card image={cover5} />
        <Card image={cover6} />

        {/* Upload Card */}
        <div
          className={`
            w-[80px] h-[130px] sm:w-[100px] sm:h-[160px] md:w-[130px] md:h-[200px] lg:w-[150px] lg:h-[250px]
            bg-gradient-to-b from-[#0d0d26] to-[#030326]
            border ${
              selectedImage === "input"
                ? "border-4 border-white shadow-amber-50"
                : "border-[#3b3bff4d]"
            }
            rounded-2xl overflow-hidden shadow-md transform transition duration-300
            ${
              selectedImage !== "input"
                ? "hover:scale-105 hover:shadow-amber-50 hover:border-white"
                : ""
            }
            cursor-pointer flex justify-center items-center
          `}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <IoCloudUploadSharp className="text-white w-6 h-6 sm:w-7 sm:h-7" />
          )}
          {frontendImage && (
            <img
              src={frontendImage}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next Button */}
      {selectedImage && (
        <button
          className="min-w-[130px] sm:min-w-[150px] md:min-w-[160px] h-[48px] sm:h-[55px] md:h-[60px] text-black font-semibold bg-white rounded-full text-sm sm:text-base md:text-[18px] mt-10 cursor-pointer"
          onClick={() => navigate("/Customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
