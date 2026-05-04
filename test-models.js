import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There isn't a direct listModels in the simple SDK usually, but we can try the REST approach or check docs.
    // Actually, let's just try 'gemini-1.5-flash-latest' and 'gemini-pro' as fallbacks to see what works.
    
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
    
    for (const m of models) {
      console.log(`Testing model: ${m}...`);
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const result = await model.generateContent("test");
        console.log(`✅ ${m} works!`);
      } catch (e) {
        console.log(`❌ ${m} failed: ${e.message}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

listModels();
