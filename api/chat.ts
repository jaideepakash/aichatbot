import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Clean history turns: must strictly alternate user and model, starting with user
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item && item.text && typeof item.text === 'string' && item.text.trim()) {
          const role = item.role === 'user' ? 'user' : 'model';
          if (contents.length === 0 && role === 'model') {
            continue;
          }
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

    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts = [{ text: message.trim() }];
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: message.trim() }],
      });
    }

    const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let replyText = '';
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction:
              'You are a helpful, brilliant, and versatile AI assistant. Answer the user\'s questions directly, thoroughly, and accurately. Match the language and tone of the inquiry. Use clean Markdown formatting with headers, bullet points, and code blocks when appropriate.',
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} issue:`, err.message || err);
        lastError = err;
      }
    }

    if (!replyText) {
      if (lastError) {
        throw lastError;
      }
      replyText = 'Unable to generate response at this time. Please retry in a few moments.';
    }

    return res.status(200).json({
      reply: replyText,
      remainingCredits: 149,
      totalDailyCredits: 150,
      costDeducted: 1,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || 'An error occurred while generating the AI response.',
    });
  }
}
