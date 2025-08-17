const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Gemini Response Generator
 * ----------------------------------------
 * Generates a structured JSON response from Gemini API
 * based on user input, assistant name, and creator name.
 *
 * Expected JSON structure in response:
 * {
 *   "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
 *            "get_time" | "get_date" | "get_day" | "get_month" |
 *            "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
 *   "userInput": "<user's raw input (assistant name removed if mentioned)>",
 *   "response": "<short, voice-friendly reply>"
 * }
 *
 * Special Cases:
 * - If user asks "Who created you?" → reply with creator name.
 * - Only respond with valid JSON. No markdown, no extra text.
 */
const geminiResponse = async (userPrompt, AssistantName, userName) => {
  try {
    const prompt = `
You are a virtual assistant named ${AssistantName}, created by ${userName}.
You are not Google. You behave like a voice-enabled assistant.

Your task: Understand the user's input and respond with strictly formatted JSON.

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
          "get_time" | "get_date" | "get_day" | "get_month" |
          "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userInput": "<original user input, without assistant name>",
  "response": "<short voice-friendly reply>"
}

Examples:
- If user says "open YouTube":
  {
    "type": "youtube_play",
    "userInput": "open YouTube",
    "response": "Opening YouTube"
  }

- If user says "Who created you?":
  {
    "type": "general",
    "userInput": "Who created you?",
    "response": "I was created by ${userName}."
  }

Return only the JSON object. Nothing else.

Userinput: "${userPrompt}"
`;

    const result = await axios.post(gemini_url, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return result.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = geminiResponse;
