// import request from "request";
import * as cheerio from "cheerio";
import request from "request";
// import { Article } from "../models/article.js";
import {connectDB} from "../utilis/db.js";
import Article from "../models/article.js";



export const runBlogScraper = () => {

    let blogs = [];
    let completedPages = 0;
    const TOTAL_PAGES = 15;

    
  function scrapePage(page) {
    const url =
      page === 1
        ? "https://beyondchats.com/blogs/"
        : `https://beyondchats.com/blogs/page/${page}/`;

    request({ url, timeout: 10000 }, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        $("article.entry-card").each((i, el) => {
          blogs.push({
            title: $(el).find("h2.entry-title a").text().trim(),
            url: $(el).find("h2.entry-title a").attr("href"),
            excerpt: $(el).find(".entry-excerpt p").text().trim(),
            author: $(el).find(".meta-author span").text().trim(),
            date: $(el).find("time.ct-meta-element-date").text().trim(),
          });
        });
      }

      completedPages++;

      if (completedPages === TOTAL_PAGES) {
        saveToDB(blogs);
      }
    });
  }

  // ⏱️ delayed scraping
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    setTimeout(() => scrapePage(i), i * 150);
  }
};

const saveToDB = async (blogs) => {
  try {
    const lastFiveBlogs = blogs.slice(-5);

    for (const blog of lastFiveBlogs) {
      await Article.updateOne(
        { url: blog.url },  
        { $set: blog },       
        { upsert: true }       
      );
    }

    console.log("🔥 Last 5 blogs upserted successfully");
  } catch (error) {
    console.error(" MongoDB upsert error:", error.message);
  }
};
