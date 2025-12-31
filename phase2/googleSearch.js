import axios from "axios";

export const googleSearch = async (query) => {
  const res = await axios.post(
    "https://google.serper.dev/search",
    { q: query },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.organic.slice(0, 2); // top 2 links
};
