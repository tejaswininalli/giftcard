import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Server-side proxy for Gemini AI gift recommendations
app.post('/api/recommendations', async (req, res) => {
  try {
    const { criteria, availableProducts } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({ recommendations: null, note: 'No API key configured' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const promptText = `
You are the master gifting curator at Giftora, a luxury Indian gift boutique.
A customer is looking for gift recommendations based on:
- Recipient: ${criteria?.recipient || 'Not specified'}
- Occasion: ${criteria?.occasion || 'General occasion'}
- Budget: ${criteria?.budget || 'Flexible'}
- Interests & Hobbies: ${criteria?.interests || 'Open to ideas'}
- Delivery urgency: ${criteria?.timeline || 'Standard'}
- Additional customer notes / natural prompt: ${criteria?.freeformPrompt || 'None'}

Here is our available product catalogue (with IDs, names, categories, and INR prices):
${(availableProducts || []).map((p: any) => `ID: ${p.id} | Name: "${p.name}" | Price: ₹${p.price} | Category: ${p.category} | Tags: ${p.tags?.join(', ')}`).join('\n')}

Select between 3 and 5 best matching products from this exact catalogue.
For each product, write a warm, thoughtful 1-2 sentence reason why this exact gift will delight them.
Respond ONLY in valid JSON format as an array of objects:
[
  {
    "productId": "p-1",
    "reason": "Personalized reason highlighting why this fits their interests and budget.",
    "matchScore": 95
  }
]
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text?.trim() || '[]';
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return res.json({ recommendations: parsed });
  } catch (err: any) {
    console.warn('Server Gemini API error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Failed to generate recommendations' });
  }
});

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: serve index.html for all frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Giftora production server listening on port ${port}`);
});
