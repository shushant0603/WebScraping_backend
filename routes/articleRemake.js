import express from "express";
// import Article from "../models/article.js";
import { runPhase2 } from "../phase2/ScrapperGoogle.js";

const router = express.Router();



router.post("/run", async (req, res) => {
  try {
    const data = await runPhase2();
    res.json({ 
      success: true,
      message: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Phase 2 Error:", error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;