# 30min/day — AI Learning Companion

## Project Structure

```
ai-learner/
├── index.html     ← Frontend (what users see)
├── server.js      ← Backend (holds API key, talks to Anthropic)
├── package.json   ← Node dependencies
├── .env           ← Your secret API key (never share this file)
└── .gitignore     ← Keeps .env out of Git
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Open `.env` and replace `your-api-key-here` with your real Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxx
```

### 3. Start the server
```bash
npm start
```

### 4. Open in browser
Go to: http://localhost:3000

## How it works

- The **frontend** (`index.html`) sends messages to `/api/chat` on your server
- The **backend** (`server.js`) receives those messages, adds the API key, and calls Anthropic
- Your API key **never touches the browser** — it only lives in `.env` on your machine

## ⚠️ Before sharing / hosting

- Never commit `.env` to GitHub
- When deploying to a host like Railway or Render, add `ANTHROPIC_API_KEY` as an environment variable in their dashboard instead of using a `.env` file
