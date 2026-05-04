import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testAI() {
  try {
    // Some versions take an options object as second arg
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Attempting to force v1 through the model options if the constructor doesn't take it
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });

    console.log("Testing gemini-1.5-flash with forced v1 options...");
    const result = await model.generateContent("Say hello");
    console.log("✅ Success:", result.response.text());
  } catch (error) {
    console.log("❌ Failed:", error.message);
  }
}

testAI();
