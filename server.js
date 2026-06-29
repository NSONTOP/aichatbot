import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const HISTORY_FILE = "./history.json";

function loadHistory() {
  try {
    if (!fs.existsSync(HISTORY_FILE)) return [];
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveHistory(data) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
}

let history = loadHistory();

const MODEL = process.env.MODEL;

if (!process.env.OPENROUTER_API_KEY) {
  console.error("Missing OPENROUTER_API_KEY");
  process.exit(1);
}

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Empty message" });
  }

  history.push({ role: "user", content: userMessage });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Chatbot"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: history
      })
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    if (!response.ok) {
      return res.json({
        reply: data?.error?.message || "Provider returned error"
      });
    }

    const botMessage =
      data?.choices?.[0]?.message?.content ||
      "No response from model";

    history.push({ role: "assistant", content: botMessage });
    saveHistory(history);

    res.json({ reply: botMessage });

  } catch (err) {
    res.json({ reply: "Server error: " + err.message });
  }
});

app.get("/history", (req, res) => {
  res.json(history);
});

app.post("/clear", (req, res) => {
  history = [];
  saveHistory(history);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});