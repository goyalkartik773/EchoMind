# 🤖 EchoMind - AI-Powered Voice Assistant

<div align="center">

![EchoMind Banner](screenshots/banner.png)

**A full-stack, voice-enabled virtual assistant powered by Google Gemini AI**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-demo-link.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue)](https://reactjs.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Challenges & Learnings](#-challenges--learnings)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🌟 Overview

**EchoMind** is a full-stack voice-enabled virtual assistant that allows users to interact with AI through natural speech. Built with React and Node.js, it leverages Google Gemini AI for intelligent responses and the Web Speech API for voice recognition and text-to-speech capabilities.

Users can create personalized assistants with custom names and avatars, execute voice commands to search the web, open applications, get time/date information, and receive AI-powered conversational responses.

**Target Audience:** Developers, students, and tech enthusiasts looking for a customizable AI assistant solution.

---

## ✨ Features

### 🎤 Voice Interaction
- **Real-time Speech Recognition** - Continuous voice listening with wake-word detection
- **Text-to-Speech Responses** - Natural voice feedback with multi-language support
- **High Accuracy** - Confidence-based transcript processing

### 🤖 AI-Powered Intelligence
- **Google Gemini Integration** - Advanced natural language understanding
- **Context-Aware Responses** - Personalized replies based on user data
- **Multi-Command Support** - Search, navigation, time/date, weather, and general queries

### 🎨 Customization
- **Personalized Avatars** - Choose from pre-designed assistants or upload custom images
- **Custom Assistant Names** - Name your assistant anything you want
- **Responsive Design** - Seamless experience across desktop and mobile devices

### 🔐 User Management
- **Secure Authentication** - JWT-based login/signup with bcrypt password hashing
- **Session Management** - Persistent user sessions with HTTP-only cookies
- **Command History** - Track all interactions with your assistant

### 🌐 Web Actions
- Google Search integration
- YouTube search and playback
- Social media shortcuts (Instagram, Facebook)
- Calculator and weather access
- Real-time time/date information

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - UI library with hooks and context API
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Web Speech API** - Browser-native voice recognition and synthesis
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Token-based authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **Cookie Parser** - Cookie management
- **CORS** - Cross-origin resource sharing
- **Moment.js** - Date/time formatting

### **AI & Cloud Services**
- **Google Gemini AI** - Natural language processing and response generation
- **Cloudinary** - Image storage and CDN
- **MongoDB Atlas** - Cloud database hosting

### **Deployment**
- **Render** - Backend hosting
- **Netlify** - Frontend hosting
- **GitHub** - Version control and CI/CD

---

## 🏗️ System Architecture

### High-Level Flow

```
User Voice Input → Web Speech API → Frontend (React)
                                          ↓
                                    HTTP Request (Axios)
                                          ↓
                              Backend API (Express + JWT Auth)
                                          ↓
                                  MongoDB (User Data)
                                          ↓
                              Google Gemini API (AI Processing)
                                          ↓
                              JSON Response (type, userInput, response)
                                          ↓
                              Frontend (Command Handler)
                                          ↓
                    Text-to-Speech + Web Actions (Google, YouTube, etc.)
```

### Key Components

1. **Authentication Layer**
   - JWT tokens stored in HTTP-only cookies
   - Middleware validates tokens on protected routes
   - Bcrypt hashes passwords before storage

2. **Voice Recognition System**
   - Continuous listening with wake-word detection
   - Processes only when assistant name is mentioned
   - Stops during TTS to prevent feedback loops

3. **AI Processing Pipeline**
   - User prompt sent to backend with credentials
   - Backend enriches prompt with user context (name, assistant name)
   - Gemini AI returns structured JSON response
   - Frontend parses response and executes appropriate action

4. **Command Execution**
   - Type-based routing (search, time, general, etc.)
   - Web actions open in new tabs
   - Voice responses use browser TTS

5. **Image Management**
   - Pre-designed avatars stored locally
   - User uploads processed via Multer
   - Images stored on Cloudinary CDN
   - URLs saved in MongoDB

---

## 📸 Screenshots

### Sign Up
![Sign Up Page](screenshots/signup.png)

### Sign In
![Sign In Page](screenshots/signin.png)

### Customize Assistant - Select Avatar
![Customize Avatar](screenshots/customize.png)

### Customize Assistant - Enter Name
![Customize Name](screenshots/assname.png)

### Home - Assistant Dashboard
![Home Dashboard](screenshots/testing.png)

### Mobile View - Hamburger Menu
![Mobile Menu](screenshots/mob.png)


---

## 📁 Folder Structure

```
VirtualAssistant/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   └── database.js             # MongoDB connection
│   ├── controllers/
│   │   ├── auth.js                 # Signup/Signin/Logout logic
│   │   └── userAuth.js             # User profile & AI assistant logic
│   ├── middlewares/
│   │   ├── isAuth.js               # JWT verification middleware
│   │   └── multer.js               # File upload configuration
│   ├── models/
│   │   └── user.js                 # User schema (Mongoose)
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── userRoutes.js           # User & assistant endpoints
│   ├── gemini.js                   # Google Gemini API integration
│   ├── index.js                    # Express server entry point
│   ├── .env                        # Environment variables (not committed)
│   ├── .env.example                # Environment template
│   └── package.json                # Backend dependencies
│
├── frontend/
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── assets/                 # Images, GIFs, backgrounds
│   │   ├── components/
│   │   │   ├── Card.jsx            # Avatar selection card
│   │   │   └── JarvisPage.jsx      # Animation component
│   │   ├── context/
│   │   │   ├── UserContext.jsx     # Context provider
│   │   │   └── UserDataContext.jsx # Context definition
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Main assistant interface
│   │   │   ├── SignUp.jsx          # User registration
│   │   │   ├── Signin.jsx          # User login
│   │   │   ├── Customize.jsx       # Avatar selection
│   │   │   └── Customize2.jsx      # Assistant naming
│   │   ├── App.jsx                 # Route configuration
│   │   ├── main.jsx                # React entry point
│   │   └── App.css                 # Global styles
│   ├── .env                        # Frontend environment variables
│   ├── .env.example                # Frontend environment template
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
│
├── screenshots/                    # Project screenshots (for README)
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
├── DEPLOYMENT_CHECKLIST.md         # Quick deployment checklist
├── TROUBLESHOOTING.md              # Common issues and solutions
└── LICENSE                         # MIT License
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Google Gemini API** key
- **Cloudinary** account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/VirtualAssistant.git
   cd VirtualAssistant/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your credentials (see [Environment Variables](#-environment-variables))

4. **Start the server**
   ```bash
   npm start
   ```
   Backend runs on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with backend URL

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
# Server Configuration
PORT=8000

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (Frontend URL)
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)

```env
# Backend API URL
VITE_API_URL=http://localhost:8000
```

**Note:** Never commit `.env` files to version control. Use `.env.example` as a template.

---

## 💡 Challenges & Learnings

### Technical Challenges

1. **Speech Recognition Feedback Loop**
   - **Problem:** TTS output was triggering speech recognition, creating infinite loops
   - **Solution:** Implemented `isSpeakingRef` to track TTS state and prevent recognition during speech output

2. **Continuous Recognition Management**
   - **Problem:** Speech recognition would randomly stop or fail to restart
   - **Solution:** Added fallback interval checks and error handling with automatic restart logic

3. **Gemini API Response Parsing**
   - **Problem:** Gemini sometimes returned markdown-wrapped JSON or plain text
   - **Solution:** Implemented regex-based JSON extraction and validation before parsing

4. **CORS in Production**
   - **Problem:** Frontend and backend on different domains caused CORS errors
   - **Solution:** Dynamic origin checking with environment-based allowed origins list

5. **Mobile Responsiveness**
   - **Problem:** Voice UI elements didn't scale well on small screens
   - **Solution:** Implemented Tailwind responsive classes and tested across devices

### Architectural Learnings

- **Context API vs Redux:** Used React Context for simpler state management
- **JWT in Cookies:** More secure than localStorage for token storage
- **Cloudinary Integration:** Efficient image CDN reduced server load
- **Environment-Based Config:** Simplified deployment across environments
- **Error Boundaries:** Added comprehensive error handling at multiple layers

---

## 🚀 Future Improvements

### Features
- [ ] Multi-language support for voice recognition and responses
- [ ] Conversation history with search and export functionality
- [ ] Voice customization (pitch, speed, accent)
- [ ] Integration with calendar, email, and productivity apps
- [ ] Offline mode with cached responses
- [ ] Custom command creation and shortcuts
- [ ] Multi-user support with shared assistants

### Technical Enhancements
- [ ] WebSocket for real-time updates
- [ ] Redis caching for faster API responses
- [ ] Rate limiting and request throttling
- [ ] Unit and integration testing (Jest, React Testing Library)
- [ ] CI/CD pipeline with automated deployments
- [ ] Docker containerization
- [ ] GraphQL API as alternative to REST
- [ ] Progressive Web App (PWA) support

### UI/UX
- [ ] Dark/light theme toggle
- [ ] Animated transitions and micro-interactions
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Voice waveform visualization
- [ ] Tutorial/onboarding flow for new users

### Performance
- [ ] Code splitting and lazy loading
- [ ] Image optimization and lazy loading
- [ ] Service worker for caching
- [ ] Database query optimization with indexing
- [ ] CDN for static assets

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent response generation
- **Web Speech API** for browser-native voice capabilities
- **MongoDB Atlas** for reliable cloud database hosting
- **Cloudinary** for seamless image management
- **Render & Netlify** for free-tier hosting solutions

---

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on [GitHub Issues](https://github.com/yourusername/VirtualAssistant/issues)
- Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)

---

<div align="center">

**Made with ❤️ using React, Node.js, and AI**

⭐ Star this repo if you found it helpful!

</div>
