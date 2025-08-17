// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UserDataContext } from "../context/UserDataContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import img1 from "../assets/audio1.gif";
// import img2 from "../assets/audio2.gif";
// import JarvisPage from "../components/JarvisPage";
// import { RiMenu3Line } from "react-icons/ri";
// import { RxCross2 } from "react-icons/rx";


// function Home() {
//     const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
//     const navigate = useNavigate();
//     const [userText,setUserText] = useState("");
//     const [aiText,setAiText] = useState(""); 
//     const [, setListening] = useState(false); // We don't use the value, only the setter
//     const isSpeakingRef = useRef(false);      // 🧠 Track TTS speaking status
//     const recognitionRef = useRef(null);      // 🎤 Store recognition instance
//     const isRecognizingRef = useRef(false);   // 🧠 Persist recognition state across renders
//     const [ham,setHam] = useState(false);
//     // 🧠 Handle logout
//     const handleLogOut = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//             toast.success(result.data.message || "Assistant logged out successfully!");
//             setUserData(null);
//             navigate("/signin");
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || "Failed to logout";
//             toast.error(errorMessage);
//             console.error(err);
//         }
//     };

//     // 🎤 Manually start recognition
//     const startRecognition = () => {
//         try {
//             if (recognitionRef.current && !isSpeakingRef.current && !isRecognizingRef.current) {
//                 recognitionRef.current.start();
//                 setListening(true);
//             }
//         } catch (err) {
//             if (err.message.includes("start")) {
//                 console.error("Recognition error", err);
//             }
//         }
//     };

//     // // 🔊 Speak a response
//     // const speak = (text) => {
//     //     const synth = window.speechSynthesis;
//     //     if (!synth) return console.warn("Speech synthesis not supported");

//     //     const utterance = new SpeechSynthesisUtterance(text);
//     //     utterance.lang = 'hi-IN';
//     //     const voices = window.speechSynthesis.getVoices();
//     //     const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//     //     if(hindiVoice){
//     //         utterance.voice = hindiVoice;
//     //     }
//     //     isSpeakingRef.current = true;

//     //     utterance.onend = () => {
//     //         isSpeakingRef.current = false;
//     //         startRecognition(); // Restart recognition after speaking ends
//     //     };

//     //     synth.speak(utterance);
//     // };
// const speak = (text) => {
//     const synth = window.speechSynthesis;
//     if (!synth) return console.warn("Speech synthesis not supported");

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'hi-IN';

//     const setVoiceAndSpeak = () => {
//         const voices = synth.getVoices();
//         const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//         if (hindiVoice) {
//             utterance.voice = hindiVoice;
//         }

//         isSpeakingRef.current = true;

//         utterance.onend = () => {
//             setAiText("");
//             isSpeakingRef.current = false;
//             startRecognition(); // Restart recognition after speaking ends
//         };

//         synth.speak(utterance);
//     };

//     if (synth.getVoices().length === 0) {
//         synth.onvoiceschanged = setVoiceAndSpeak;
//     } else {
//         setVoiceAndSpeak();
//     }
// };

//     // 🎙️ Setup speech recognition logic
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             console.error("SpeechRecognition not supported");
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;
//         recognition.lang = "en-US";
//         recognitionRef.current = recognition;

//         const safeRecognition = () => {
//             if (!isSpeakingRef.current && !isRecognizingRef.current) {
//                 try {
//                     recognition.start();
//                     console.log("Recognition requested to start");
//                 } catch (err) {
//                     if (err.name !== "InvalidStateError") {
//                         console.error("Start error:", err);
//                     }
//                 }
//             }
//         };

//         recognition.onstart = () => {
//             console.log("Recognition started");
//             isRecognizingRef.current = true;
//             setListening(true);
//         };

//         recognition.onend = () => {
//             console.log("Recognition ended");
//             isRecognizingRef.current = false;
//             setListening(false);
//         };

//         recognition.onerror = (e) => {
//             console.warn("Recognition error:", e.error);
//             isRecognizingRef.current = false;
//             setListening(false);

//             if (e.error !== "aborted" && !isSpeakingRef.current) {
//                 setTimeout(() => {
//                     safeRecognition();
//                 }, 1000);
//             }
//         };

//         recognition.onresult = async (e) => {
//             const transcript = Array.from(e.results)
//                 .map(result => result[0].transcript)
//                 .join("");

//             console.log("Transcript:", transcript);

//             if (transcript.toLowerCase().includes(userData.AssistantName.toLowerCase())) {
//                 setAiText("");
//                 setUserText(transcript);
//                 recognition.stop();
//                 isRecognizingRef.current = false;
//                 setListening(false);

//                 const result = await getGeminiResponse(transcript);
//                 console.log("Gemini result:", result);

//                 handleCommand(result);
//                 setAiText(result.response);
//                 setUserText("");
//             }
//         };

//         // ⏱️ Retry recognition every 10s if needed
//         const fallback = setInterval(() => {
//             if (!isSpeakingRef.current && !isRecognizingRef.current) {
//                 safeRecognition();
//             }
//         }, 10000);

//         safeRecognition(); // Initial start

//         return () => {
//             recognition.stop();
//             setListening(false);
//             isRecognizingRef.current = false;
//             clearInterval(fallback);
//         };
//     }, []); // Run only once on mount

//     // 🧭 Handle assistant command
//     const handleCommand = (data) => {
//         const { type, userInput, response } = data;

//         if (response) speak(response);

//         switch (type) {
//             case 'google_search':
//                 if (userInput) {
//                     const query = encodeURIComponent(userInput);
//                     window.open(`https://www.google.com/search?q=${query}`, '_blank');
//                 }
//                 break;
//             case 'youtube_search':
//             case 'youtube_play':
//                 if (userInput) {
//                     const query = encodeURIComponent(userInput);
//                     window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//                 }
//                 break;
//             case 'calculator_open':
//                 window.open('https://www.google.com/search?q=calculator', '_blank');
//                 break;
//             case 'instagram_open':
//                 window.open('https://www.instagram.com', '_blank');
//                 break;
//             case 'facebook_open':
//                 window.open('https://www.facebook.com', '_blank');
//                 break;
//             case 'weather_show':
//                 window.open('https://www.google.com/search?q=weather', '_blank');
//                 break;
//             case 'get_time':
//             case 'get_date':
//             case 'get_day':
//             case 'get_month':
//             case 'general':
//                 // Only speak the response, no browser action
//                 break;
//             default:
//                 speak("Sorry, I couldn't understand the command.");
//                 break;
//         }
//     };

//     return (
//         <div className="w-full min-h-screen bg-gradient-to-br from-[#020202] via-[#020022] to-[#000306] flex flex-col justify-center items-center overflow-hidden">
// <RiMenu3Line className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]" onClick={()=>{setHam(true)}}/>
// <div className={`lg:hidden p-[20px] absolute top-0 w-full h-full bg-[#00000029] backdrop-blur-lg  flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform`}>
//   <RxCross2 className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]" onClick={()=>{setHam(false)}}/>

//   <button
//     onClick={handleLogOut}
//     className="min-w-[120px] h-[50px] flex items-center justify-start px-6 py-3 overflow-hidden font-medium bg-white rounded"
//   >
    
//     <span className="relative w-full text-left text-black">
//       Log Out
//     </span>
//   </button>

//   <button
//     onClick={() => navigate("/Customize")}
//     className="min-w-[220px] h-[50px] flex items-center justify-start px-6 py-3 overflow-hidden font-medium bg-white rounded mt-4"
//   >
    
//     <span className="relative w-full text-left text-black">
//       Customize Assistant
//     </span>
//   </button>
//   <div className="w-full h-[2px] bg-[grey]"></div>
//   <h1 className="text-white font-semibold text-[19px]">History</h1>
//   <div className="w-full h-[400px]  overflow-y-auto flex flex-col gap-[20px]">
//    {userData.history && userData.history.length > 0 ? (
//     userData.history.map((his, idx) => (
//     <span key={idx} className="text-yellow-200 text-[18px] block">
//     {his}
//     </span>
//   ))
// ) : null}

//   </div>

// </div>


//             <a
//                 href="#_"
//                 onClick={handleLogOut}
//                 className="hidden lg:block absolute top-[20px] right-[20px] min-w-[120px] h-[50px]  items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
//             >
//                 <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:mb-32 group-hover:ml-0"></span>
//                 <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
//                     Log Out
//                 </span>
//             </a>

//             <a
//                 href="#_"
//                 onClick={() => navigate("/Customize")}
//                 className="hidden lg:block absolute top-[90px] right-[20px] min-w-[220px] h-[50px]  items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
//             >
//                 <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:mb-32 group-hover:ml-0"></span>
//                 <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
//                     Customize Assistant
//                 </span>
//             </a>

//             <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-full">
//                 <img src={userData?.AssistantImage} alt="img" className="h-full object-cover" />
//             </div>
//             <h1 className="text-white text-[18px] font-semibold">I'm {userData?.AssistantName}</h1>
//             {!aiText &&  <img src={img2} alt="audio1"/>}
//              {aiText &&  <img src={img1} alt="audio2"/>}
//              {/* {!aiText &&  <JarvisPage/>} */}
        

//             <h1 className="text-white text-[15px] font-semibold text-wrap">{userText?userText:aiText?aiText:null}</h1>
//         </div>
//     );
// }

// export default Home;
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import img1 from "../assets/audio1.gif";
import img2 from "../assets/audio2.gif";
import JarvisPage from "../components/JarvisPage";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Home() {
    // Accessing context values
    const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
    const navigate = useNavigate();

    // State for storing user speech input and AI responses
    const [userText,setUserText] = useState("");
    const [aiText,setAiText] = useState(""); 

    // State for listening status (we only use the setter, not the value)
    const [, setListening] = useState(false); 

    // Refs for persisting values across renders
    const isSpeakingRef = useRef(false);      // Tracks if TTS (Text-to-Speech) is currently speaking
    const recognitionRef = useRef(null);      // Holds recognition instance
    const isRecognizingRef = useRef(false);   // Tracks if speech recognition is active
    const [ham,setHam] = useState(false);     // Toggle for mobile hamburger menu

    //  Logout logic
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            toast.success(result.data.message || "Assistant logged out successfully!");
            setUserData(null);
            navigate("/signin");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to logout";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    //  Start recognition manually (only if not already recognizing/speaking)
    const startRecognition = () => {
        try {
            if (recognitionRef.current && !isSpeakingRef.current && !isRecognizingRef.current) {
                recognitionRef.current.start();
                setListening(true);
            }
        } catch (err) {
            if (err.message.includes("start")) {
                console.error("Recognition error", err);
            }
        }
    };

    //  Text-to-Speech logic
    const speak = (text) => {
        const synth = window.speechSynthesis;
        if (!synth) return console.warn("Speech synthesis not supported");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN'; // Default language set to Hindi

        // Function to set proper voice and speak
        const setVoiceAndSpeak = () => {
            const voices = synth.getVoices();
            const hindiVoice = voices.find(v => v.lang === 'hi-IN');
            if (hindiVoice) {
                utterance.voice = hindiVoice;
            }

            isSpeakingRef.current = true;

            utterance.onend = () => {
                setAiText(""); // Reset AI text once speaking is done
                isSpeakingRef.current = false;
                startRecognition(); // Restart recognition after speech ends
            };

            synth.speak(utterance);
        };

        // If voices are not loaded yet, wait for them
        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = setVoiceAndSpeak;
        } else {
            setVoiceAndSpeak();
        }
    };

    //  Setup speech recognition logic
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("SpeechRecognition not supported");
            return;
        }

        // Create recognition instance
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US"; // Recognition language set to English
        recognitionRef.current = recognition;

        // Helper to safely start recognition
        const safeRecognition = () => {
            if (!isSpeakingRef.current && !isRecognizingRef.current) {
                try {
                    recognition.start();
                    console.log("Recognition requested to start");
                } catch (err) {
                    if (err.name !== "InvalidStateError") {
                        console.error("Start error:", err);
                    }
                }
            }
        };

        // Recognition events
        recognition.onstart = () => {
            console.log("Recognition started");
            isRecognizingRef.current = true;
            setListening(true);
        };

        recognition.onend = () => {
            console.log("Recognition ended");
            isRecognizingRef.current = false;
            setListening(false);
        };

        recognition.onerror = (e) => {
            console.warn("Recognition error:", e.error);
            isRecognizingRef.current = false;
            setListening(false);

            // Restart recognition unless error is "aborted" or TTS is speaking
            if (e.error !== "aborted" && !isSpeakingRef.current) {
                setTimeout(() => {
                    safeRecognition();
                }, 1000);
            }
        };

        //  On successful recognition of speech
        recognition.onresult = async (e) => {
            const transcript = Array.from(e.results)
                .map(result => result[0].transcript)
                .join("");

            console.log("Transcript:", transcript);

            // Only respond if assistant's name is mentioned in transcript
            if (transcript.toLowerCase().includes(userData.AssistantName.toLowerCase())) {
                setAiText("");
                setUserText(transcript);

                recognition.stop(); // Stop recognition while AI processes
                isRecognizingRef.current = false;
                setListening(false);

                // Get AI (Gemini) response
                const result = await getGeminiResponse(transcript);
                console.log("Gemini result:", result);

                // Handle command from AI result
                handleCommand(result);

                setAiText(result.response);
                setUserText("");
            }
        };

        //  Retry recognition every 10s if stopped accidentally
        const fallback = setInterval(() => {
            if (!isSpeakingRef.current && !isRecognizingRef.current) {
                safeRecognition();
            }
        }, 10000);

        safeRecognition(); // Initial recognition start

        // Cleanup on unmount
        return () => {
            recognition.stop();
            setListening(false);
            isRecognizingRef.current = false;
            clearInterval(fallback);
        };
    }, []); // Run only once on mount

    //  Handle assistant commands (based on Gemini response type)
    const handleCommand = (data) => {
        const { type, userInput, response } = data;

        // Speak the AI's response if available
        if (response) speak(response);

        switch (type) {
            case 'google_search':
                if (userInput) {
                    const query = encodeURIComponent(userInput);
                    window.open(`https://www.google.com/search?q=${query}`, '_blank');
                }
                break;
            case 'youtube_search':
            case 'youtube_play':
                if (userInput) {
                    const query = encodeURIComponent(userInput);
                    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                }
                break;
            case 'calculator_open':
                window.open('https://www.google.com/search?q=calculator', '_blank');
                break;
            case 'instagram_open':
                window.open('https://www.instagram.com', '_blank');
                break;
            case 'facebook_open':
                window.open('https://www.facebook.com', '_blank');
                break;
            case 'weather_show':
                window.open('https://www.google.com/search?q=weather', '_blank');
                break;
            case 'get_time':
            case 'get_date':
            case 'get_day':
            case 'get_month':
            case 'general':
                // For general responses, only TTS is used
                break;
            default:
                speak("Sorry, I couldn't understand the command.");
                break;
        }
    };

    // JSX UI for Home component
   return (
        <div className="w-full h-screen bg-gradient-to-br from-[#020202] via-[#020022] to-[#000306] flex flex-col items-center justify-between relative overflow-hidden px-4 py-6">

            {/* Mobile hamburger menu */}
            <RiMenu3Line 
                className="lg:hidden text-white absolute top-4 right-4 w-7 h-7 cursor-pointer" 
                onClick={()=>{setHam(true)}} 
            />
            <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-[#000000bb] backdrop-blur-md flex flex-col gap-6 items-start p-6 z-50 transform ${ham ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <RxCross2 
                    className="text-white absolute top-0 right-[-2px] w-7 h-7 cursor-pointer" 
                    onClick={()=>{setHam(false)}} 
                />
                <button
                    onClick={handleLogOut}
                    className="w-full h-12 bg-white rounded-lg font-medium text-black"
                >
                    Log Out
                </button>
                <button
                    onClick={() => navigate("/Customize")}
                    className="w-full h-12 bg-white rounded-lg font-medium text-black"
                >
                    Customize Assistant
                </button>
                <div className="w-full h-[1px] bg-gray-500 my-2"></div>
                <h1 className="text-white font-semibold text-lg">History</h1>
                <div className="w-full flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
                    {userData.history && userData.history.length > 0 ? (
                        userData.history.map((his, idx) => (
                            <span key={idx} className="text-yellow-200 text-base">
                                {his}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No history yet</span>
                    )}
                </div>
            </div>

            {/* Top Right Desktop Buttons */}
            <div className="hidden lg:flex flex-col gap-3 absolute top-6 right-6">
                <button
                    onClick={handleLogOut}
                    className="w-32 h-10 bg-white text-black font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all"
                >
                    Log Out
                </button>
                <button
                    onClick={() => navigate("/Customize")}
                    className="w-56 h-10 bg-white text-black font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all"
                >
                    Customize Assistant
                </button>
            </div>

            {/* Center Assistant Section */}
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 max-[360px]:w-40 max-[360px]:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img src={userData?.AssistantImage} alt="assistant" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-white text-lg sm:text-xl font-semibold max-[360px]:text-base">
                    I'm {userData?.AssistantName}
                </h1>

                {/* Audio Animation */}
               
{/* Audio Animation */}
<div className="flex items-center justify-center mt-3">
    {!aiText ? (
        <img 
            src={img2} 
            alt="listening" 
            className="h-[120px] w-[800px]" 
        />
    ) : (
        <img 
            src={img1} 
            alt="speaking" 
            className="h-[120px] w-[800px] " 
        />
    )}
</div>



                {/* Spoken/Recognized Text */}
                <div className="max-w-md px-4 text-center">
                    <h1 className="text-white text-sm sm:text-base font-medium break-words max-[360px]:text-xs">
                        {userText || aiText || ""}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Home;
