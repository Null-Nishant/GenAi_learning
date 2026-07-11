import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config();
import readline from "readline-sync";

const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_KEY });

async function main() {
  const history = [];

  const interaction1 = await ai.interactions.create({
    model: "gemini-3.5-flash",
    store: false,
    input: history,
  });
  console.log("Response 1:", interaction1.steps.at(-1).content[0].text);

  history.push(...interaction1.steps);

  history.push({
    type: "user_input",
    content: [{ type: "text", text: "How many paws are in my house?" }]
  });

  const interaction2 = await ai.interactions.create({
    model: "gemini-3.5-flash",
    store: false,
    input: history
  });
  console.log("Response 2:", interaction2.steps.at(-1).content[0].text);
}

await main();