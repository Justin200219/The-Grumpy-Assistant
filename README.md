# The Grumpy Assistant

A full-stack AI assistant with a unique "Resistance Meter" personality system that controls how helpful the AI is. The more you interact, the more Bernie's mood changes - sometimes for better, sometimes for worse!

## 🎭 Features

- **Dynamic Resistance System**: Bernie's helpfulness varies based on a resistance score that changes with each interaction
- **Mood-Based Responses**: Different personality states (Grumpy, Furious, Skeptical, Helpful) affect Bernie's tone
- **Visual Mood Indicator**: Real-time mood bar showing Bernie's current resistance level
- **Markdown Support**: Clean, formatted responses with support for tables, lists, code blocks, and more
- **Modern UI**: Sleek dark-themed interface with smooth animations

## 🏗️ Architecture

The project uses a dual-model AI flow:
1. **Analyst Model**: Evaluates user messages and adjusts the resistance score
2. **Actor Model**: Generates responses based on the current resistance level and mood

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React, Vite, Tailwind CSS (with Typography plugin)
- **AI:** Ollama (Local LLM)
- **Markdown Rendering:** marked + DOMPurify

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Ollama](https://ollama.com/) (installed and running)

## 🚀 Setup Instructions

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

## 🎮 Usage

1. Ensure Ollama is running locally with the required models installed
2. Start both backend and frontend servers (see setup instructions above)
3. Open `http://localhost:5173` in your browser
4. Chat with Bernie and watch the Resistance Meter react to your interactions!

## 📝 Configuration

The resistance system can be configured in `backend/controllers/chatController.js`:
- Initial resistance score
- Decay rate
- Action modifiers (politeness, demanding requests, etc.)

## 🎨 UI Customization

The frontend uses Tailwind CSS with a custom dark theme. You can modify the styling in:
- `frontend/src/index.css` - Global styles and custom scrollbar
- `frontend/tailwind.config.js` - Tailwind configuration
- Component files in `frontend/src/components/`

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📄 License

This project is open source and available under the MIT License.
