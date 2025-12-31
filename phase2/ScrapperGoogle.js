import axios from "axios";
import { googleSearch } from "./googleSearch.js";
import { scrapeContent } from "./scrapeContent.js";
import { rewriteWithLLM } from "./llmWrite.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const runPhase2 = async () => {

  const { data: articles } = await axios.get(
    "http://localhost:3000/api/articles"
  );

  // 🔥 safety: process only 1 article
  const safeArticles = articles
    .filter(a => a.source !== "ai-generated")
    .slice(0, 1);

  const processedArticles = [];

  for (const article of safeArticles) {
    try {
      console.log(`\n📝 Processing article: ${article.title}`);

      // 1️⃣ Google search
      const results = await googleSearch(article.title);
      if (results.length < 2) {
        console.log("⚠️ Not enough search results, skipping...");
        continue;
      }

      console.log(`✅ Found ${results.length} references`);
      console.log(`  - ${results[0].link}`);
      console.log(`  - ${results[1].link}`);

      // 2️⃣ Scrape reference content
      const ref1 = await scrapeContent(results[0].link);
      const ref2 = await scrapeContent(results[1].link);
      console.log("📄 Scraped reference content");

      // 3️⃣ LLM call (Gemini)
      console.log("🤖 Generating content with LLM...");
      const { newContent1, newContent2 } = await rewriteWithLLM(
        article.excerpt || article.content,
        ref1,
        ref2
      );
      console.log("✅ Content generated successfully");

      // 4️⃣ Publish newContent1 (based on Reference 1)
      const response1 = await axios.post("http://localhost:3000/api/articles", {
        title: `AI Version 1: ${article.title}`,
        content: newContent1,
        references: [results[0].link],
        source: "ai-generated",
      });
      console.log(`✅ Article 1 published: ${response1.data._id}`);

      // 5️⃣ Publish newContent2 (based on Reference 2)
      const response2 = await axios.post("http://localhost:3000/api/articles", {
        title: `AI Version 2: ${article.title}`,
        content: newContent2,
        references: [results[1].link],
        source: "ai-generated",
      });
      console.log(`✅ Article 2 published: ${response2.data._id}`);
      
      processedArticles.push(response1.data, response2.data);
      console.log(`✅ Article published: ${response.data._id}\n`);
    } catch (error) {
      console.error(`❌ Error processing article "${article.title}": ${error.message}`);
      // Continue to next article
    }
  }

  return {
    message: "Phase 2 completed successfully",
    articlesProcessed: processedArticles.length,
    articles: processedArticles
  };
};
