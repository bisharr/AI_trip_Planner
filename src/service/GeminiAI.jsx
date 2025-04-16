import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCKPaMOFURKXnokmRNEKUTTrjiyPUNN3u4",
});

export async function generateGeminiJSON(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${prompt}\n\nRespond ONLY with raw JSON, no explanation, no markdown.`,
            },
          ],
        },
      ],
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("No text found in Gemini response:", response);
      return null;
    }

    // 🔥 Strip Markdown formatting if present
    text = text.trim();

    // Remove triple backtick and optional language tag (like ```json)
    if (text.startsWith("```")) {
      text = text
        .replace(/```[a-z]*\n?/i, "")
        .replace(/```$/, "")
        .trim();
    }

    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error("Gemini JSON error:", error);
    return null;
  }
}
const prompt = `
Generate a travel itinerary in JSON format for 3 days in Kampala, Uganda. 
Include 'day', 'activities', and 'estimated_cost' for each day.
`;
generateGeminiJSON(prompt);
