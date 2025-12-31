import express from "express";
import Article from "../models/article.js";
import { runBlogScraper } from "../src/Scrapper.js";

const router = express.Router();


// ✅ SCRAPE article
 router.post("/scrape", async (req, res) =>{
   try {
     await runBlogScraper();
     res.json({ message: "Phase 1 executed successfully" });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
})
//✅ CREATE article
router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// READ all articles
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
});


// READ single article
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });
  res.json(article);
});


//  UPDATE article
router.put("/:id", async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(article);
});


// DELETE article
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Article deleted" });
});

export default router;
