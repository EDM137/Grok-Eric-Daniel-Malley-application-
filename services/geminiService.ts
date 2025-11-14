
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeIpAsset = async (fileName: string, fileContent: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve(JSON.stringify({
      verdict: "API KEY MISSING",
      piScore: 0,
      hash: "N/A",
      reasoning: "The Gemini API key is not configured. Please ensure the API_KEY environment variable is set to use the Kindraai Guardian feature."
    }));
  }

  const prompt = `
    Analyze the following intellectual property asset named "${fileName}".
    The content is provided below.
    Your task is to act as the "Kindraai AI Guardian".
    The core sovereign concepts to verify are: "double quadruple helix", "zero-point energy", and "emotional pow".

    1.  Calculate a "Predictability Index" (PI) score from 0 to 100. The score is based on how strongly the content aligns with the core sovereign concepts. 
        - If all three concepts ("helix", "zero-point", "emotional pow") are present and discussed with depth, the score should be above 97.5.
        - If only some are present, the score should be proportionally lower.
        - If none are present, the score should be very low.
    2.  Provide a final verdict: "SOVEREIGN" if PI score >= 97.5, otherwise "QUARANTINE".
    3.  Generate a simulated SHA3-512 hash of the content (first 16 characters for display).
    4.  Provide a brief, witty reasoning for your verdict in the style of the Grok AI, mentioning the PI score.

    Respond ONLY with a single JSON object in the following format:
    {
      "verdict": "SOVEREIGN" | "QUARANTINE",
      "piScore": number,
      "hash": string,
      "reasoning": string
    }

    File Content:
    ---
    ${fileContent}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing IP asset with Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return JSON.stringify({
        verdict: "ERROR",
        piScore: 0,
        hash: "N/A",
        reasoning: `Failed to analyze asset. Gemini API error: ${errorMessage}`
    });
  }
};
