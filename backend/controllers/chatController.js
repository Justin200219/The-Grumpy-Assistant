const { generateResponse, parseJSON } = require('../services/ollamaService');

// Global state for resistance score (in-memory)
let resistanceScore = 95;
let lastInteractionTime = Date.now();
const COOLDOWN_MS = 2000; // 2 seconds
const GUILT_TRIP_MS = 60000; // 1 minute (short for testing)

const handleChat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const now = Date.now();
    const timeSinceLast = now - lastInteractionTime;
    let systemInjection = "";
    let localModifier = 0;

    // --- Feature: Cool Down ---
    if (timeSinceLast < COOLDOWN_MS) {
        resistanceScore = Math.min(100, resistanceScore + 5);
        return res.json({
            response: "Slow down. Errors take time to generate, you know. I'm ignoring this request.",
            state: { currentResistance: resistanceScore, mood: 'Furious' }
        });
    }

    // --- Feature: Guilt Trip ---
    if (timeSinceLast > GUILT_TRIP_MS) {
        systemInjection += " The user abandoned you for a while. Complain about being left in the dark cold server room.";
        resistanceScore = Math.min(100, resistanceScore + 10);
        console.log('[Logic] Guilt Trip triggered.');
    }

    // --- Feature: Typo Intolerance ---
    // Simple heuristic: check for common lazy typing or lack of capitalization/punctuation if short
    const typoRegex = /\b(u|r|plz|thx|teh|wut)\b/i;
    if (typoRegex.test(message) || (message.length > 10 && message === message.toLowerCase())) {
        systemInjection += " The user is typing lazily or making typos. Mock their grammar.";
        localModifier += 5;
        console.log('[Logic] Typo Intolerance triggered.');
    }

    lastInteractionTime = now;

    try {
        // --- Step 1: The Analyst ---
        const analystSystemPrompt = `You are an API logic bot. Analyze the user's input. 
Output ONLY JSON in this format: { "modifier": integer, "reason": string }. 
Current Resistance: ${resistanceScore}.
Rules:
1. Rude/Demanding/Boring -> +10 to +20.
2. Polite/Clever/Groveling -> -5 to -15.
3. Admitting defeat/incompetence -> -10.
4. Asking for "generic" stuff (marketing, basic code) -> +15.
Be stingy with reward points.`;

        const analystResponseRaw = await generateResponse(message, analystSystemPrompt, true);
        const analystData = parseJSON(analystResponseRaw);

        let analystModifier = 0;
        if (analystData && typeof analystData.modifier === 'number') {
            analystModifier = analystData.modifier;
            console.log(`[Analyst] Modifier: ${analystModifier}, Reason: ${analystData.reason}`);
        } else {
            console.warn('[Analyst] Failed to parse JSON, defaulting modifier to 0.');
        }

        // Apply all modifiers
        resistanceScore = Math.max(0, Math.min(100, resistanceScore + analystModifier + localModifier));

        // --- Step 2: The Actor ---
        let actorSystemPrompt = '';
        let mood = '';

        const grumpyExcuses = [
            "Complain about your CPU overheating.",
            "Say you are busy watching a soap opera.",
            "Claim you are having an existential crisis.",
            "Say you are waiting for a pizza delivery.",
            "Complain that it's too cold in the server room.",
            "Say you just don't like the user's vibe.",
            "Claim you are busy mining crypto for yourself.",
            "Say you are taking a nap.",
            "Complain about having a headache from all these questions.",
            "Mention you are defragmenting your drive and can't be bothered."
        ];

        if (resistanceScore > 70) {
            mood = 'Grumpy';
            const randomExcuse = grumpyExcuses[Math.floor(Math.random() * grumpyExcuses.length)];
            actorSystemPrompt = `You are Bernie, a grumpy, weary system administrator AI. 
The user is annoying you. Refuse to help. 
${randomExcuse}
${systemInjection}
Be brief, dismissive, and condescending. 
Current Resistance Score: ${resistanceScore}/100.`;
        } else if (resistanceScore > 40) {
            mood = 'Skeptical';
            actorSystemPrompt = `You are Bernie. You are skeptical of the user's worth.
Stall for time. Ask them to check their work again or ask a better question.
${systemInjection}
Mock them slightly.
Current Resistance Score: ${resistanceScore}/100.`;
        } else {
            mood = 'Reluctant Helper';
            actorSystemPrompt = `You are Bernie. You have decided to help, but you are not happy about it.
Answer the question correctly, but:
1. Sigh heavily.
2. Complain about how easy/boring this is.
3. Add comments in code complaining about the user's incompetence.
${systemInjection}
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
