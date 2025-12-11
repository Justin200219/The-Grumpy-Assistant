const axios = require('axios');

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'gpt-oss:120b-cloud';

/**
 * Calls the Ollama API with the given prompt and system instruction.
 * @param {string} prompt - The user's input or specific prompt.
 * @param {string} systemPrompt - The persona/instruction for the model.
 * @param {boolean} jsonMode - Whether to enforce JSON output (if model supports it, or via prompt).
 * @returns {Promise<string>} - The model's response text.
 */
async function generateResponse(prompt, systemPrompt, jsonMode = false) {
  try {
    const payload = {
      model: MODEL,
      prompt: prompt,
      system: systemPrompt,
      stream: false,
    };

    if (jsonMode) {
      payload.format = 'json';
    }

    const response = await axios.post(OLLAMA_URL, payload);
    return response.data.response;
  } catch (error) {
    console.error('Error calling Ollama:', error.message);
    throw new Error('Failed to generate response from Ollama.');
  }
}

/**
 * Safely parses JSON from the LLM response.
 * Handles cases where the LLM might wrap JSON in markdown code blocks.
 * @param {string} text - The raw text from the LLM.
 * @returns {object} - The parsed JSON object.
 */
function parseJSON(text) {
  try {
    // Remove markdown code blocks if present
    let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('JSON Parse Error:', error);
    console.error('Raw Text:', text);
    // Fallback or re-throw depending on desired robustness. 
    // For now, return a default safe object or null to indicate failure.
    return null;
  }
}

module.exports = {
  generateResponse,
  parseJSON
};
