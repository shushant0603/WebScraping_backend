import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeContent = async (url) => {
  try {
    const { data } = await axios.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    const $ = cheerio.load(data);

    const content = $("p")
      .map((i, el) => $(el).text())
      .get()
      .slice(0, 25)
      .join(" ");
    
    return content || "No content extracted";
  } catch (error) {
    console.warn(`⚠️ Failed to scrape ${url}: ${error.message}`);
    return `Content from ${url} - Unable to fetch due to site restrictions`;
  }
};
