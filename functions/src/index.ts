import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // Make sure request body is parsed

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

app.post("/summarize", async (req: Request, res: Response): Promise<void> => {
    const content: string = req.body.content;
  
    if (!content) {
      res.status(400).json({ error: "Missing content" });
      return;
    }
  
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this:\n\n${content}` }],
        temperature: 0.5,
      });
  
      const summary = completion.choices[0].message.content;
      res.status(200).json({ summary });
      return; // optional
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ error: "Summarization failed" });
      return; // optional
    }
  });
  
exports.api = functions.https.onRequest(app);
