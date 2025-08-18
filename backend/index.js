// -------------------- IMPORTS --------------------
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectdb = require("./config/database");
const geminiResponse = require("./gemini");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// -------------------- APP CONFIG --------------------
const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- MIDDLEWARES --------------------

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS (for frontend-backend communication)
app.use(
  cors({
    origin: "https://echomind-do2h.onrender.com",
    credentials: true,
  })
);

// Enable cookie parsing for authentication/session
app.use(cookieParser());

// -------------------- ROUTES --------------------

// Auth related routes
app.use("/api/auth", authRouter);

// User related routes
app.use("/api/user", userRouter);

// -------------------- TEST ROUTE (optional) --------------------
// Uncomment to test Gemini integration
/*
app.get("/", async (req, res) => {
  const prompt = req.query.prompt;

  if (prompt) {
    try {
      const data = await geminiResponse(prompt);
      return res.json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Gemini failed",
        details: err.message,
      });
    }
  }

  return res.send("Hello from the server!");
});
*/

// -------------------- SERVER START --------------------
app.listen(PORT, () => {
  connectdb(); // Connect to database before accepting requests
  console.log(`✅ Server started on port ${PORT}`);
});

