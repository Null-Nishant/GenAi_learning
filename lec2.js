import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_KEY });

async function main() {
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input:"What is the capital of France?"
    });
    console.log(interaction.output_text);
}

main();