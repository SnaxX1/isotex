import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testAI() {
  try {
    // Specifying v1 explicitly if possible, or using a model that definitely exists in v1
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Some versions of the SDK allow passing the version in the getGenerativeModel
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      apiVersion: 'v1' 
    });

    console.log("Testing gemini-1.5-flash on v1...");
    const result = await model.generateContent("Say hello");
    console.log("✅ Success:", result.response.text());
  } catch (error) {
    console.log("❌ Failed:", error.message);
  }
}

testAI();
