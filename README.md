

##  Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key
- Serper API key (for Google search)

## 📦 Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
```bash
npm install

The following packages will be installed:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `@google/generative-ai` - Gemini AI SDK
- `axios` - HTTP client
- `cheerio` - Web scraping
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `request` - HTTP requests

## ⚙️ Configuration

1. **Create a `.env` file in the root directory**
```bash
 .env
```

2. **Add the following environment variables**
```env
GEMINI_API_KEY=your_gemini_api_key_here
SERPER_API_KEY=your_serper_api_key_here
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
```

### Getting API Keys:

- **Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Serper API Key**: Sign up at [Serper.dev](https://serper.dev/)
- **MongoDB URI**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🏃 Running the Application

**Start the server**
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)




## 📡 API Endpoints

### Phase 1 - Article Scraping & CRUD

#### Scrape Articles
```http
POST /api/articles/scrape
```
Scrapes articles from configured sources and stores them in MongoDB.

#### Create Article
```http
POST /api/articles
Content-Type: application/json

{
  "title": "Article Title",
  "content": "Article content...",
  "author": "Author Name"
}
```

#### Get All Articles
```http
GET /api/articles
```
Returns all articles sorted by creation date (newest first).

#### Get Single Article
```http
GET /api/articles/:id
```
Returns a specific article by ID.

#### Update Article
```http
PUT /api/articles/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### Phase 2 - AI-Powered Article Rewriting

#### Run Phase 2 (Google Search + Scrape + Rewrite)


```http
POST /api/articles/phase2/run
```


Performs Google search, scrapes content, and rewrites articles using Gemini AI with a 250-word limit.




