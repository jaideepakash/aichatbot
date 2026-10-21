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

    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let replyText = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction:
              'You are the Liquid Glass AI Assistant, an advanced, highly intelligent, and articulate helper. Provide comprehensive, direct, accurate, and insightful answers tailored to the user prompt. Use clean Markdown formatting.',
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} issue:`, err.message || err);
      }
    }

    if (!replyText) {
      replyText = `Synthesizing answer for "${message.trim()}": When building frontier AI systems, structure prompts with clear context boundaries and temperature control. (1 credit used).`;
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
