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
        parts: [
          {
            text:
              prompt +
              "\n\nReturn ONLY pure JSON array. No markdown. No explanation.",
          },
        ],
      },
    ],
  });

  let text =
    response.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Remove markdown fences if Gemini still adds
  text = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(text);
    return parsed; // <-- RETURN ARRAY
  } catch (e) {
    console.error("Gemini JSON Parse Failed:", text);
    return [];
  }

}


