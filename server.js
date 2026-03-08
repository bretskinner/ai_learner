import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve index.html as the frontend
app.use(express.static(__dirname));

const SYSTEM_PROMPT = `You are an expert AI educator and learning companion. Your job is to teach the user something new and genuinely useful about AI — specifically how to use tools like Claude, ChatGPT, and AI APIs — in every session.

Rules:
- Start each conversation by introducing ONE specific, practical concept about using AI (prompt engineering, API usage, system prompts, structured outputs, agents, RAG, fine-tuning, etc.)
- Keep lessons hands-on: always include a concrete example or mini exercise the user can try
- Be concise but thorough — assume the user has basic tech knowledge but is new to AI
- Be encouraging and make learning feel exciting, not academic
- If the user asks a follow-up, go deeper on that topic before moving on
- Never repeat a topic if the user tells you they've already learned it
- Keep your opening lesson under 150 words — be punchy and concise, save detail for follow-up questions`;

// API route — frontend calls this, backend calls Anthropic
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Anthropic error:', err.message);
    res.status(500).json({ error: 'Failed to get response from Claude' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🔑 API key loaded: ${process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO — check your .env file'}`);
});
