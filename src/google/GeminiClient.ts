import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiClient {
  private readonly ai: GoogleGenerativeAI;

  public static newClient(): GeminiClient | null {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
    if (!apiKey) {
      return null;
    }
    return new GeminiClient(apiKey);
  }

  constructor(apiKey: string) {
    this.ai = new GoogleGenerativeAI(apiKey);
  }

  async generate(prompt: string): Promise<string> {
    try {
      const model = this.ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;

      return response.text() || "";
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(`Gemini API error: ${error}`);
    }
  }
}

export default GeminiClient;
