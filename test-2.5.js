import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testAI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("Testing gemini-2.5-flash...");
    const result = await model.generateContent("Say hello");
    console.log("✅ Success:", result.response.text());
  } catch (error) {
    console.log("❌ Failed:", error.message);
  }
}

testAI();
