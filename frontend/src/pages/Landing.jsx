import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaRobot, FaBrain, FaPlay } from "react-icons/fa";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#020202] via-[#020022] to-[#000306] flex flex-col items-center justify-center px-4 py-8 overflow-hidden relative">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-8">

                {/* Logo/Title Section */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaRobot className="text-6xl sm:text-7xl md:text-8xl text-blue-400 animate-bounce" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">EchoMind</span>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        Your AI-Powered Voice Assistant
                    </p>

                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                        Experience the future of voice interaction. Create your personalized AI assistant with custom avatars, voice commands, and intelligent responses powered by Google Gemini AI.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <FaMicrophone className="text-4xl text-green-400 mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Voice Recognition</h3>
                        <p className="text-gray-400 text-sm">Real-time speech recognition with wake-word detection</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <FaBrain className="text-4xl text-purple-400 mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">AI-Powered</h3>
                        <p className="text-gray-400 text-sm">Intelligent responses using Google Gemini AI</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <FaRobot className="text-4xl text-blue-400 mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Customizable</h3>
                        <p className="text-gray-400 text-sm">Create your own assistant with custom name & avatar</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-2xl">

                    {/* Try Demo Button */}
                    <button
                        onClick={() => navigate("/demo")}
                        className="flex-1 group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <FaPlay className="text-xl" />
                            <span>Try Demo</span>
                        </div>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>

                    {/* Sign Up Button */}
                    <button
                        onClick={() => navigate("/signup")}
                        className="flex-1 group relative overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
                    >
                        <span>Sign Up Free</span>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>

                    {/* Sign In Button */}
                    <button
                        onClick={() => navigate("/signin")}
                        className="flex-1 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                    >
                        Sign In
                    </button>
                </div>

                {/* Info Text */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-gray-400 text-sm">
                        ✨ No credit card required • 100% Free to start
                    </p>
                    <p className="text-yellow-300 text-xs sm:text-sm">
                        🎮 Try the demo first - No signup needed!
                    </p>
                </div>

                {/* Features List */}
                <div className="mt-12 w-full max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
                        What You Can Do
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">Ask for time, date, and day</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">Search Google & YouTube</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">Open apps & websites</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">Get weather information</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">AI-powered conversations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm sm:text-base">Custom voice commands</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-500 text-xs sm:text-sm">
                    <p>Built with React, Node.js & Google Gemini AI</p>
                    <p className="mt-2">
                        Made with ❤️ by{" "}
                        <a
                            href="https://github.com/goyalkartik773"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            Kartik Goel
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Landing;
