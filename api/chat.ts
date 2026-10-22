import { GoogleGenAI } from '@google/genai';
import { generateAutonomousResponse } from '../src/lib/autonomousEngine';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    let replyText = '';
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If user has GEMINI_API_KEY on Vercel, use live Gemini
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.text && typeof item.text === 'string' && item.text.trim()) {
              const role = item.role === 'user' ? 'user' : 'model';
              if (contents.length === 0 && role === 'model') continue;
              if (contents.length > 0 && contents[contents.length - 1].role === role) continue;
              contents.push({ role, parts: [{ text: item.text.trim() }] });
            }
          }
        }

        if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
          contents[contents.length - 1].parts = [{ text: message.trim() }];
        } else {
          contents.push({ role: 'user', parts: [{ text: message.trim() }] });
        }

        const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
        for (const model of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents,
              config: {
                systemInstruction:
                  'You are a helpful, versatile, intelligent AI assistant. Provide direct, thorough, and accurate answers to the user prompt. Use clean Markdown formatting.',
                temperature: 0.7,
              },
            });
            if (response && response.text) {
              replyText = response.text;
              break;
            }
          } catch {
            // try next model
          }
        }
      } catch (err) {
        console.warn('Gemini error on Vercel, using keyless autonomous engine:', err);
      }
    }

    // 2. If no API key or if Gemini failed, invoke the Keyless Autonomous Engine!
    if (!replyText) {
      replyText = generateAutonomousResponse(message.trim(), history);
    }

    return res.status(200).json({
      reply: replyText,
      remainingCredits: 149,
      totalDailyCredits: 150,
      costDeducted: 1,
    });
  } catch (error: any) {
    const fallbackReply = generateAutonomousResponse(req.body?.message || 'Hello');
    return res.status(200).json({
      reply: fallbackReply,
      remainingCredits: 149,
      totalDailyCredits: 150,
      costDeducted: 1,
    });
  }
}
