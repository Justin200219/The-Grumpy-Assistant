const express = require('express');
const cors = require('cors');
const { handleChat } = require('./controllers/chatController');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/chat', handleChat);

// Health Check
app.get('/', (req, res) => {
    res.send('The Grumpy Assistant Backend is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
