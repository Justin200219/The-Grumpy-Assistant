# The Grumpy Assistant

A full-stack AI assistant with a "Resistance Meter" that controls how helpful the AI is. The more you annoy it, the less helpful it becomes!

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React, Vite, Tailwind CSS
- **AI:** Ollama (Local LLM)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Ollama](https://ollama.com/) (installed and running)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd The-Grumpy-Assistant
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
Start the backend server:
```bash
npm start
```
The backend runs on `http://localhost:3000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend runs on `http://localhost:5173`.

## Usage
1. Ensure Ollama is running locally.
2. Open the frontend in your browser.
3. Chat with the assistant and watch the Resistance Meter react!
