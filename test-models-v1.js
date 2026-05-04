import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testModelsV1() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro"];
  
  for (const m of models) {
    console.log(`Testing ${m} on v1...`);
    try {
      const model = genAI.getGenerativeModel({ model: m }, { apiVersion: 'v1' });
      const result = await model.generateContent("test");
      console.log(`✅ ${m} works on v1!`);
    } catch (e) {
      console.log(`❌ ${m} failed on v1: ${e.message}`);
    }
  }
}

testModelsV1();
