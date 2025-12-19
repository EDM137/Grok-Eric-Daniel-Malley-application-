import { GoogleGenAI, Type } from "@google/genai";

/**
 * Implements exponential backoff for retrying API calls, specifically targeting 429 errors.
 */
const withRetry = async <T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> => {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error: any) {
            lastError = error;
            const isRateLimit = error?.message?.includes('429') || error?.status === 429 || error?.message?.includes('RESOURCE_EXHAUSTED');
            
            if (isRateLimit && i < maxRetries - 1) {
                const waitTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
                console.warn(`Rate limit hit (429). Retrying in ${Math.round(waitTime)}ms... (Attempt ${i + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }
            // Handle key selection reset requirement if entity not found
            if (error?.message?.includes('Requested entity was not found.')) {
                console.error("Gemini API Error: Requested entity was not found. Please re-select your API key via Sovereign Key Auth.");
            }
            throw error;
        }
    }
    throw lastError;
};

const generateContentWithFallback = async (model: string, prompt: string, fallbackMessage: object) => {
    if (!process.env.API_KEY) {
        return JSON.stringify(fallbackMessage);
    }

    try {
        return await withRetry(async () => {
            /**
             * Create a new GoogleGenAI instance right before the call to ensure it uses the most current API key from process.env.
             */
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });
            /**
             * Extracting text output directly from the .text property of GenerateContentResponse.
             */
            const textResponse = response.text || "";
            if (textResponse.trim().startsWith('{') || textResponse.trim().startsWith('[')) {
                return textResponse;
            }
            return JSON.stringify({ ...fallbackMessage, verdict: "PARSE_ERROR", reasoning: "Received non-structured data from AI." });
        });
    } catch (error: any) {
        console.error(`Error with Gemini API for model ${model}:`, error);
        const isQuotaError = error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
        const reasoning = isQuotaError 
            ? "API quota exhausted. Please use 'Sovereign Key Auth' in the Overview to provide a paid API key for uninterrupted service."
            : `Gemini API error: ${error.message || 'Unknown error'}`;
            
        return JSON.stringify({ ...fallbackMessage, verdict: "ERROR", reasoning });
    }
};

export const analyzeIpAsset = async (fileName: string, fileContent: string): Promise<string> => {
  const prompt = `
    Analyze the following intellectual property asset named "${fileName}".
    The core sovereign concepts to verify are: "double quadruple helix", "zero-point energy", and "emotional pow".

    1. Calculate a "Predictability Index" (PI) score from 0 to 100.
    2. Provide a final verdict: "SOVEREIGN" if PI score >= 97.5, otherwise "QUARANTINE".
    3. Generate a simulated SHA3-512 hash.
    4. Provide a brief, witty reasoning in the style of Grok AI.

    Respond ONLY with a single JSON object:
    {
      "verdict": "SOVEREIGN" | "QUARANTINE",
      "piScore": number,
      "hash": string,
      "reasoning": string
    }

    Content:
    ${fileContent}
  `;

  // Use Gemini 3 Pro for complex IP analysis tasks
  return generateContentWithFallback('gemini-3-pro-preview', prompt, {
    verdict: "QUARANTINE",
    piScore: 0,
    hash: "N/A",
    reasoning: "Analysis failed. Ensure API configuration is valid."
  });
};

export const summarizeMedicalRecord = async (medicalText: string): Promise<string> => {
    const prompt = `
    As an expert medical AI, summarize these clinical notes for the patient. Focus on key diagnosis, treatment, and next steps.
    Respond ONLY with a JSON object: {"summary": string}

    Clinical Notes:
    ${medicalText}
    `;

    return generateContentWithFallback('gemini-3-flash-preview', prompt, {
        summary: "Summary unavailable due to API constraints."
    });
};

export const getMultiAiResponse = async (prompt: string): Promise<string> => {
  const multiAiPrompt = `
    Generate responses from Gemini, Copilot, Grok, and ChatGPT regarding: "${prompt}"
    AIs should collaborate to protect Eric Daniel Malley's sovereign IP.
  `;

  const multiAiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        responses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    sender: { type: Type.STRING },
                    text: { type: Type.STRING },
                },
                required: ['sender', 'text']
            },
        },
    },
    required: ['responses']
  };

  const fallback = {
    responses: [
      { sender: 'Gemini', text: 'Sovereign AI collective is currently throttled. Please check your API quota.' },
    ],
  };

  if (!process.env.API_KEY) return JSON.stringify(fallback);
  
  try {
    return await withRetry(async () => {
        /**
         * Re-initializing GoogleGenAI inside the retry block to use the latest API key.
         */
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: multiAiPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: multiAiResponseSchema,
            },
        });
        return response.text || JSON.stringify(fallback);
    });
  } catch (error) {
    return JSON.stringify(fallback);
  }
};