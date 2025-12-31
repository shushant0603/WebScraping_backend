import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // scraped article fields
    url: { type: String, unique: true, sparse: true },
    excerpt: String,
    author: String,
    date: String,

    // AI-generated fields
    content: String,
    references: [String],
    source: {
      type: String,
      enum: ["scraped", "ai-generated"],
      default: "scraped"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
