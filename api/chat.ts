import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Check for API key on Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length === 0) {
      return res.status(200).json({
        reply: "🔑 **Gemini API Key Required**\n\nTo enable live responses on Vercel:\n1. Open your **Vercel Dashboard**.\n2. Go to your project > **Settings** > **Environment Variables**.\n3. Add a variable named `GEMINI_API_KEY` with your Google Gemini API key.\n4. Click **Redeploy** on your latest deployment.\n\nOnce added, your chatbot will respond instantly!",
        remainingCredits: 150,
        totalDailyCredits: 150,
        costDeducted: 0,
      });
    }

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
        console.warn(`Model ${model} issue on Vercel:`, err.message || err);
        lastError = err;
      }
    }

    if (!replyText) {
      const errDetail = lastError?.message || 'Model service temporarily busy';
      replyText = `⚠️ **Temporary Inference Notice**\n\nThe AI model encountered a temporary issue: *${errDetail}*.\n\nPlease try asking your question again in a moment.`;
    }

    return res.status(200).json({
      reply: replyText,
      remainingCredits: 149,
      totalDailyCredits: 150,
      costDeducted: 1,
    });
  } catch (error: any) {
    console.error('Vercel handler error:', error);
    return res.status(200).json({
      reply: `⚠️ **Unable to process request**\n\nError: ${error.message || 'Unknown network error'}. Please try again.`,
      remainingCredits: 150,
      totalDailyCredits: 150,
      costDeducted: 0,
    });
  }
}
