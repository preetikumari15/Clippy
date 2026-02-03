import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateScript(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
}


