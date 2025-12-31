
import express from "express";

import { connectDB } from "./utilis/db.js";
import dotenv from "dotenv";
import cors from "cors";
import articleRouter from "./routes/articleRouter.js";
import articleRemake from "./routes/articleRemake.js";



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB().then(() => {
  console.log("🚀 DB ready");
});


 const PORT = process.env.PORT || 3000;

app.use('/api/articles', articleRouter);

app.use('/api/articles/phase2', articleRemake);


app.listen(PORT, () => {
  console.log("🚀 Server running on port 3000");
});
