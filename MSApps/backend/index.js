import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "25540812-faf2b76d586c1787d2dd02736";

app.use(cors());

app.get("/api/photos", async (req, res) => {
  const { category, page = 1, per_page = 9 } = req.query;
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${category}&page=${page}&per_page=${per_page}`
    );
    res.json(response.data.hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
