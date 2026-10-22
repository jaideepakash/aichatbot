import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DAILY_CREDIT_LIMIT = 150;
const COST_PER_QUERY = 1;

// Daily credit ledger keyed by `clientId_YYYY-MM-DD`
interface CreditRecord {
  used: number;
  lastUsed: number;
}
const creditLedger = new Map<string, CreditRecord>();

function getTodayKey(clientIdentifier: string): { key: string; dateStr: string; resetTimestamp: number } {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const key = `${clientIdentifier}_${dateStr}`;
  
  // Calculate midnight UTC reset timestamp
  const nextMidnight = new Date();
  nextMidnight.setUTCHours(24, 0, 0, 0);
  
  return { key, dateStr, resetTimestamp: nextMidnight.getTime() };
}

function getClientIdentifier(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'client_default';
}

// GET /api/credits - Returns daily 150 credit status
app.get('/api/credits', (req, res) => {
  try {
    const clientId = getClientIdentifier(req);
    const { key, resetTimestamp } = getTodayKey(clientId);
    const record = creditLedger.get(key) || { used: 0, lastUsed: Date.now() };
    const remaining = Math.max(0, DAILY_CREDIT_LIMIT - record.used);

    res.json({
      totalDailyCredits: DAILY_CREDIT_LIMIT,
      usedCredits: record.used,
      remainingCredits: remaining,
      costPerMessage: COST_PER_QUERY,
      resetAt: new Date(resetTimestamp).toISOString(),
      resetTimestamp,
    });
  } catch (err: any) {
    const nextMidnight = new Date();
    nextMidnight.setUTCHours(24, 0, 0, 0);
    res.json({
      totalDailyCredits: DAILY_CREDIT_LIMIT,
      usedCredits: 0,
      remainingCredits: DAILY_CREDIT_LIMIT,
      costPerMessage: COST_PER_QUERY,
      resetAt: nextMidnight.toISOString(),
      resetTimestamp: nextMidnight.getTime(),
    });
  }
});

// POST /api/chat - Generate real AI response with 150 daily credits quota enforcement
app.post('/api/chat', async (req, res) => {
  const clientId = getClientIdentifier(req);
  const { key, resetTimestamp } = getTodayKey(clientId);
  const record = creditLedger.get(key) || { used: 0, lastUsed: Date.now() };
  const currentRemaining = Math.max(0, DAILY_CREDIT_LIMIT - record.used);

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message cannot be empty.' });
      return;
    }

    // Enforce 150 daily credit limit
    if (record.used + COST_PER_QUERY > DAILY_CREDIT_LIMIT) {
      res.status(429).json({
        error: `Daily credit limit reached! You have used all ${DAILY_CREDIT_LIMIT} credits for today.`,
        remainingCredits: 0,
        totalDailyCredits: DAILY_CREDIT_LIMIT,
        resetAt: new Date(resetTimestamp).toISOString(),
        resetTimestamp,
      });
      return;
    }

    // Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length === 0) {
      res.status(200).json({
        reply: "🔑 **Gemini API Key Required**\n\nTo enable live responses from Google Gemini:\n- **If running on Vercel**: Add `GEMINI_API_KEY` in your **Vercel Project Settings > Environment Variables** and redeploy.\n- **If running in AI Studio**: Add `GEMINI_API_KEY` in the **Settings > Secrets** panel.\n\nOnce added, live responses will activate instantly!",
        remainingCredits: currentRemaining,
        totalDailyCredits: DAILY_CREDIT_LIMIT,
        usedCredits: record.used,
        costDeducted: 0,
        resetTimestamp,
      });
      return;
    }

    // Initialize client dynamically with available key
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Clean history turns: must strictly alternate user and model, starting with user
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item && item.text && typeof item.text === 'string' && item.text.trim()) {
          const role = item.role === 'user' ? 'user' : 'model';
          // Skip leading model greeting if present
          if (contents.length === 0 && role === 'model') {
            continue;
          }
          // Avoid duplicate consecutive roles
          if (contents.length > 0 && contents[contents.length - 1].role === role) {
            continue;
          }
          contents.push({
            role,
            parts: [{ text: item.text.trim() }],
          });
        }
      }
    }

    // Ensure final turn is user message
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts = [{ text: message.trim() }];
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: message.trim() }],
      });
    }

    let replyText = '';
    const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction:
              'You are the Liquid Glass AI Assistant, an advanced, highly intelligent, and articulate helper. Answer the user\'s questions directly, thoroughly, and accurately. Match the language and tone of the inquiry. Use clean Markdown formatting with headers, bullet points, and code blocks when appropriate.',
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          replyText = response.text;
          break; // successfully generated response!
        }
      } catch (err: any) {
        console.warn(`Model ${model} issue:`, err.message || err);
        lastError = err;
      }
    }

    if (!replyText) {
      const errDetail = lastError?.message || 'Model service temporarily busy';
      replyText = `⚠️ **Temporary Inference Notice**\n\nThe AI model encountered a temporary issue: *${errDetail}*.\n\nPlease try asking your question again in a moment. (No credits were deducted).`;
      
      res.json({
        reply: replyText,
        remainingCredits: currentRemaining,
        totalDailyCredits: DAILY_CREDIT_LIMIT,
        usedCredits: record.used,
        costDeducted: 0,
        resetTimestamp,
      });
      return;
    }

    // Deduct 1 credit upon successful response
    record.used += COST_PER_QUERY;
    record.lastUsed = Date.now();
    creditLedger.set(key, record);

    const remaining = Math.max(0, DAILY_CREDIT_LIMIT - record.used);

    res.json({
      reply: replyText,
      remainingCredits: remaining,
      totalDailyCredits: DAILY_CREDIT_LIMIT,
      usedCredits: record.used,
      costDeducted: COST_PER_QUERY,
      resetTimestamp,
    });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    res.status(200).json({
      reply: `⚠️ **Unable to process request**\n\nError: ${error.message || 'Unknown network error'}. Please try again.`,
      remainingCredits: currentRemaining,
      totalDailyCredits: DAILY_CREDIT_LIMIT,
      usedCredits: record.used,
      costDeducted: 0,
      resetTimestamp,
    });
  }
});

// Explicit route for Google AdSense ads.txt
app.get('/ads.txt', (_req, res) => {
  res.type('text/plain').send('google.com, pub-1933356530106735, DIRECT, f08c47fec0942fa0\n');
});

// Setup Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
