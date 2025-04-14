import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCKPaMOFURKXnokmRNEKUTTrjiyPUNN3u4",
});

export async function main(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
  });

  console.log(response.text);
  return response.text;
}

main();
