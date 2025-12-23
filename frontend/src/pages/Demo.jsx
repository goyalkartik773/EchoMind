import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img1 from "../assets/audio1.gif";
import img2 from "../assets/audio2.gif";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Demo() {
    const navigate = useNavigate();
    const [userText, setUserText] = useState("");
    const [aiText, setAiText] = useState("");
    const [, setListening] = useState(false);
    const isSpeakingRef = useRef(false);
    const recognitionRef = useRef(null);
    const isRecognizingRef = useRef(false);
    const [ham, setHam] = useState(false);
    const [commandHistory, setCommandHistory] = useState([]);

    // Demo assistant configuration
    const demoAssistant = {
        AssistantName: "Echo",
        AssistantImage: "https://res.cloudinary.com/demo/image/upload/v1/assistant-demo.png" // You can replace with any demo image
    };

    // Start recognition
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

    // Text-to-Speech
    const speak = (text) => {
        const synth = window.speechSynthesis;
        if (!synth) return console.warn("Speech synthesis not supported");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        const setVoiceAndSpeak = () => {
            const voices = synth.getVoices();
            const englishVoice = voices.find(v => v.lang === 'en-US');
            if (englishVoice) {
                utterance.voice = englishVoice;
            }

            isSpeakingRef.current = true;

            utterance.onend = () => {
                setAiText("");
                isSpeakingRef.current = false;
                startRecognition();
            };

            synth.speak(utterance);
        };

        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = setVoiceAndSpeak;
        } else {
            setVoiceAndSpeak();
        }
    };

    // Simple AI response (without backend)
    const getDemoResponse = (transcript) => {
        const input = transcript.toLowerCase();

        // Time
        if (input.includes("time")) {
            const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            return { type: "get_time", response: `The current time is ${time}` };
        }

        // Date
        if (input.includes("date")) {
            const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            return { type: "get_date", response: `Today's date is ${date}` };
        }

        // Day
        if (input.includes("day")) {
            const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
            return { type: "get_day", response: `Today is ${day}` };
        }

        // Google search
        if (input.includes("search") || input.includes("google")) {
            const query = input.replace(/.*(?:search|google)\s+(?:for\s+)?/i, '');
            return { type: "google_search", userInput: query, response: `Searching Google for ${query}` };
        }

        // YouTube
        if (input.includes("youtube") || input.includes("play")) {
            const query = input.replace(/.*(?:youtube|play)\s+/i, '');
            return { type: "youtube_search", userInput: query, response: `Opening YouTube for ${query}` };
        }

        // Calculator
        if (input.includes("calculator")) {
            return { type: "calculator_open", response: "Opening calculator" };
        }

        // Instagram
        if (input.includes("instagram")) {
            return { type: "instagram_open", response: "Opening Instagram" };
        }

        // Facebook
        if (input.includes("facebook")) {
            return { type: "facebook_open", response: "Opening Facebook" };
        }

        // Weather
        if (input.includes("weather")) {
            return { type: "weather_show", response: "Showing weather information" };
        }

        // Who created you
        if (input.includes("created") || input.includes("made")) {
            return { type: "general", response: "I was created by Kartik Goel as a demo AI assistant" };
        }

        // Default
        return {
            type: "general",
            response: "I'm a demo assistant. Try asking me about time, date, or tell me to search Google or YouTube!"
        };
    };

    // Setup speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Speech recognition not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognitionRef.current = recognition;

        const safeRecognition = () => {
            if (!isSpeakingRef.current && !isRecognizingRef.current) {
                try {
                    recognition.start();
                    console.log("Recognition started");
                } catch (err) {
                    if (err.name !== "InvalidStateError") {
                        console.error("Start error:", err);
                    }
                }
            }
        };

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

            if (e.error !== "aborted" && !isSpeakingRef.current) {
                setTimeout(() => {
                    safeRecognition();
                }, 1000);
            }
        };

        recognition.onresult = async (e) => {
            const lastResultIndex = e.results.length - 1;
            const transcript = e.results[lastResultIndex][0].transcript;

            console.log("Transcript:", transcript);

            if (transcript.toLowerCase().includes(demoAssistant.AssistantName.toLowerCase())) {
                setAiText("");
                setUserText(transcript);

                recognition.stop();
                isRecognizingRef.current = false;
                setListening(false);

                try {
                    const result = getDemoResponse(transcript);
                    console.log("Demo result:", result);

                    if (result) {
                        handleCommand(result);
                        setAiText(result.response || "");
                        setCommandHistory(prev => [...prev, transcript].slice(-10)); // Keep last 10
                    }
                } catch (error) {
                    console.error("Error processing command:", error);
                    setAiText("Sorry, something went wrong.");
                    speak("Sorry, something went wrong.");
                } finally {
                    setUserText("");
                }
            }
        };

        const fallback = setInterval(() => {
            if (!isSpeakingRef.current && !isRecognizingRef.current) {
                safeRecognition();
            }
        }, 10000);

        safeRecognition();

        return () => {
            recognition.stop();
            setListening(false);
            isRecognizingRef.current = false;
            clearInterval(fallback);
        };
    }, []);

    // Handle commands
    const handleCommand = (data) => {
        if (!data) {
            console.error("No data received in handleCommand");
            speak("Sorry, I didn't receive any data.");
            return;
        }

        const { type, userInput, response } = data;

        if (response) {
            speak(response);
        }

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
            case 'error':
                break;
            default:
                console.warn("Unknown command type:", type);
                speak("Sorry, I couldn't understand the command.");
                break;
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-[#020202] via-[#020022] to-[#000306] flex flex-col items-center justify-between relative overflow-hidden px-4 py-6">

            {/* Demo Badge */}
            <div className="absolute top-4 left-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold text-sm z-50">
                🎮 DEMO MODE
            </div>

            {/* Mobile hamburger menu */}
            <RiMenu3Line
                className="lg:hidden text-white absolute top-4 right-4 w-7 h-7 cursor-pointer z-50"
                onClick={() => setHam(true)}
            />

            <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-[#000000bb] backdrop-blur-md flex flex-col gap-6 items-start p-6 z-50 transform ${ham ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <RxCross2
                    className="text-white absolute top-4 right-4 w-7 h-7 cursor-pointer"
                    onClick={() => setHam(false)}
                />

                <div className="w-full bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mt-12">
                    <p className="text-yellow-300 text-sm">
                        This is a demo. Sign up to create your own custom assistant!
                    </p>
                </div>

                <button
                    onClick={() => navigate("/signup")}
                    className="w-full h-12 bg-gradient-to-r from-[#38f404] to-[#a8ff78] text-black rounded-lg font-medium"
                >
                    Sign Up (Free)
                </button>

                <button
                    onClick={() => navigate("/signin")}
                    className="w-full h-12 bg-white text-black rounded-lg font-medium"
                >
                    Sign In
                </button>

                <div className="w-full h-[1px] bg-gray-500 my-2"></div>
                <h1 className="text-white font-semibold text-lg">Recent Commands</h1>
                <div className="w-full flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
                    {commandHistory.length > 0 ? (
                        commandHistory.map((cmd, idx) => (
                            <span key={idx} className="text-yellow-200 text-sm">
                                {cmd}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No commands yet. Try saying "Echo, what time is it?"</span>
                    )}
                </div>
            </div>

            {/* Top Right Desktop Buttons */}
            <div className="hidden lg:flex flex-col gap-3 absolute top-6 right-6">
                <button
                    onClick={() => navigate("/signup")}
                    className="w-40 h-10 bg-gradient-to-r from-[#38f404] to-[#a8ff78] text-black font-medium rounded-lg hover:scale-105 transition-all"
                >
                    Sign Up (Free)
                </button>
                <button
                    onClick={() => navigate("/signin")}
                    className="w-40 h-10 bg-white text-black font-medium rounded-lg hover:scale-105 transition-all"
                >
                    Sign In
                </button>
            </div>

            {/* Center Assistant Section */}
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg shadow-yellow-400/50">
                    <img
                        src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                        alt="demo assistant"
                        className="w-full h-full object-cover"
                    />
                </div>

                <h1 className="text-white text-lg sm:text-xl font-semibold">
                    I'm {demoAssistant.AssistantName} (Demo Assistant)
                </h1>

                <p className="text-gray-300 text-sm text-center max-w-md px-4">
                    Try saying: "<span className="text-yellow-300">Echo, what time is it?</span>" or "<span className="text-yellow-300">Echo, search Google for AI</span>"
                </p>

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
                            className="h-[120px] w-[800px]"
                        />
                    )}
                </div>

                {/* Spoken/Recognized Text */}
                <div className="max-w-md px-4 text-center">
                    <h1 className="text-white text-sm sm:text-base font-medium break-words">
                        {userText || aiText || ""}
                    </h1>
                </div>

                {/* Info Box */}
                <div className="mt-4 bg-blue-500/10 border border-blue-500 rounded-lg p-4 max-w-md">
                    <p className="text-blue-300 text-xs text-center">
                        💡 This is a limited demo. Sign up to unlock full features, custom assistants, and AI-powered responses!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Demo;
