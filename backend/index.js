const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectdb = require("./config/database");
const geminiResponse = require("./gemini");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://echomind-do2h.onrender.com"
];

// Enable CORS with dynamic origin check
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// Body parsing middleware
app.use(express.json());

// Cookie parsing middleware
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server and connect to DB
app.listen(PORT, () => {
  connectdb();
  console.log(`✅ Server started on port ${PORT}`);
});
