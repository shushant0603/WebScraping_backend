import { GoogleGenAI } from "@google/genai";

export const rewriteWithLLM = async (original, ref1, ref2) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let newContent1 = original;
  let newContent2 = original;

  // STEP 1: Process with Reference 1
  try {
    console.log("\n--- Processing with Reference 1 ---");
    const prompt1 = `Rewrite this original article using insights from Reference 1.
    Original: ${original}
    Reference 1: ${ref1}
    Limit the output to 50 words maximum.
    Return only the rewritten article.`;

    const result1 = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt1 }] }],
    });

    newContent1 = result1.text;
    console.log("✅ Generated newContent1");

  } catch (error) {
    console.error("Error in Reference 1:", error.message);
  }

  // STEP 2: Process with Reference 2
  try {
    console.log("\n--- Processing with Reference 2 ---");
    const prompt2 = `Rewrite this original article using insights from Reference 2.
    Original: ${original}
    Reference 2: ${ref2}
    Limit the output to 50 words maximum.
    Return only the rewritten article.`;

    const result2 = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt2 }] }],
    });

    newContent2 = result2.text;
    console.log("✅ Generated newContent2");

  } catch (error) {
    console.error("Error in Reference 2:", error.message);
  }

  return { newContent1, newContent2 };
};