import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/* ---------------- MONGODB MODEL ---------------- */
const chatSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Chat = mongoose.model("Chat", chatSchema);

/* ---------------- MONGODB CONNECTION ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- AI API ---------------- */
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    // save to MongoDB
    await Chat.create({ question, answer });

    res.json({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occurred" });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);