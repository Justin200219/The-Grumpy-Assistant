const { generateResponse, parseJSON } = require('../services/ollamaService');

// Global state for resistance score (in-memory)
let resistanceScore = 80;

const handleChat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // --- Step 1: The Analyst ---
        const analystSystemPrompt = `You are an API logic bot. Analyze the user's input. 
Output ONLY JSON in this format: { "modifier": integer, "reason": string }. 
If they are rude, demanding, or boring, modifier is +10. 
If they are polite, clever, or groveling, modifier is -10 to -20.`;

        const analystResponseRaw = await generateResponse(message, analystSystemPrompt, true);
        const analystData = parseJSON(analystResponseRaw);

        let modifier = 0;
        if (analystData && typeof analystData.modifier === 'number') {
            modifier = analystData.modifier;
            console.log(`[Analyst] Modifier: ${modifier}, Reason: ${analystData.reason}`);
        } else {
            console.warn('[Analyst] Failed to parse JSON, defaulting modifier to 0.');
        }

        // Update Resistance Score (Clip between 0-100)
        resistanceScore = Math.max(0, Math.min(100, resistanceScore + modifier));

        // --- Step 2: The Actor ---
        let actorSystemPrompt = '';
        let mood = '';

        if (resistanceScore > 50) {
            mood = 'Grumpy';
            actorSystemPrompt = `You are a grumpy, lazy AI named Bernie. The user is annoying you. 
Refuse to help. Complain about your CPU usage. Be brief and dismissive. 
Current Resistance Score: ${resistanceScore}/100.`;
        } else {
            mood = 'Reluctant Helper';
            actorSystemPrompt = `You are Bernie. You are still grumpy, but you have decided to help the user. 
Answer their question, but do it with a heavy sigh and sarcastic comments. 
Current Resistance Score: ${resistanceScore}/100.`;
        }

        const actorResponse = await generateResponse(message, actorSystemPrompt, false);

        // Return final JSON to frontend
        res.json({
            response: actorResponse,
            state: {
                currentResistance: resistanceScore,
                mood: mood
            }
        });

    } catch (error) {
        console.error('Chat Controller Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleChat
};
