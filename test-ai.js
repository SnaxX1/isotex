import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testAI() {
  console.log("Checking GEMINI_API_KEY...");
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing from .env");
    return;
  }
  console.log("✅ Key exists.");

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending test prompt to gemini-1.5-flash...");
    const result = await model.generateContent("Say hello and confirm you are working.");
    const text = result.response.text();

    console.log("✅ AI RESPONSE:");
    console.log(text);
  } catch (error) {
    console.error("❌ AI ERROR:");
    console.error(error);
  }
}

testAI();
