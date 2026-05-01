# CyberShield Architecture & Tech Stack

This document outlines the detailed architecture and technology stack used in the CyberShield (Phishing Detection) project.

## 1. Technology Stack Overview

### Frontend (Client-Side)
*   **Framework:** React.js (v19)
*   **Build Tool:** Vite
*   **Routing:** React Router DOM
*   **Styling:** Vanilla CSS (e.g., `Auth.css`, `Home.css`)

### Backend (Server-Side)
*   **Runtime:** Node.js
*   **Web Framework:** Express.js
*   **Cross-Origin:** CORS (Cross-Origin Resource Sharing)

### Database Layer
*   **Database:** PostgreSQL
*   **Hosting:** Neon Serverless Database
*   **ORM (Object-Relational Mapping):** Prisma ORM
*   **Database Driver:** `@neondatabase/serverless` & `@prisma/adapter-neon`

### Artificial Intelligence / External APIs
*   **Provider:** Groq API
*   **Model Used:** `llama-3.1-8b-instant`
*   **Purpose:** Powers the AI chatbot, URL analysis, and phishing text analysis.

---

## 2. System Architecture

The application follows a standard **Client-Server Architecture** with a three-tier design.

### Tier 1: Presentation Layer (Frontend)
The frontend is a Single Page Application (SPA) served by Vite during development. It handles the user interface, state management, and user interactions.
*   **Pages/Components:** Includes Home, Auth, and various dashboards for analyzing URLs and text.
*   **Communication:** Communicates with the backend using standard HTTP `fetch` requests (REST APIs).

### Tier 2: Application Layer (Backend API)
The Node.js/Express server acts as a proxy and business logic controller. 
*   **API Endpoints:**
    *   `/chat`: Proxies chat requests to the Groq AI model with a specialized system prompt for phishing awareness.
    *   `/analyze-phishing`: Takes text input and queries the Groq AI to calculate a risk score and detailed phishing analysis.
    *   `/analyze-url`: Takes a URL and queries the Groq AI to determine safety status and score.
    *   `/api/persons`: Standard CRUD endpoints to manage users/persons in the database.
*   **Security:** Keeps the Groq API key hidden on the server, preventing exposure to the client.

### Tier 3: Data Layer (Database)
The persistence layer uses a serverless PostgreSQL database hosted on Neon.
*   **Prisma ORM:** Acts as the bridge between the Node.js application and the database. It provides type-safe database queries.
*   **Connection Pooling:** Utilizes `@neondatabase/serverless` pooler for efficient, scalable database connections suitable for serverless/edge environments.

---

## 3. Data Flow Diagram

1. **User Action:** The user inputs a suspicious URL into the frontend application and clicks "Analyze".
2. **API Request:** The React frontend sends an HTTP POST request with the URL to the Express backend (`/analyze-url`).
3. **AI Processing:** 
    * The Express backend constructs a specialized prompt containing the URL.
    * The backend securely sends this prompt to the **Groq API** using the server-side API key.
4. **AI Response:** Groq's LLM processes the prompt and returns a JSON response containing the safety score, status, and message.
5. **Client Update:** The Express backend forwards the JSON response back to the React frontend.bhai isme user ka data base kidhar dikhega json format maih login and sign up ho rhaa h 6. **UI Render:** The React application updates the UI to display the safety score and analysis to the user.

*(A similar flow applies for Chat and Phishing Text Analysis. For User Management, the backend communicates with the Neon PostgreSQL database via Prisma instead of Groq).*

---

## 4. Environment Configuration
The application relies on environment variables (`.env`) for secure configuration:
*   `GROQ_API_KEY`: Used to authenticate requests to the Groq AI platform.
*   `DATABASE_URL`: The connection string for the Neon serverless PostgreSQL database.
