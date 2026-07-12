import { GoogleGenAI } from "@google/genai";
import dontenv from "dotenv";
import realine from "readline-sync";
dontenv.config();
const ai = new GoogleGenAI({});


//server side history maintaining
// async function main() {
//     const interaction_id=[];
//     while (true) {
//         let question = realine.question("Kya puchna hai tumhe?");
//         if (question === "exit") {
//             break;
//         }
//         try {
//             const result = await ai.interactions.create({
//                 model: "gemini-3.5-flash",
//                 input: question,
//                 previous_interaction_id:interaction_id.length!=0?interaction_id[interaction_id.length-1]:null,
//             });
//             interaction_id.push(result.id);
//             console.log("Result : ", result.output_text);
//         }
//         catch(err){
//             console.log(err.message);
//         }
//     }

// }
// await main();

//client side history maintain

async function main() {
    const history = [];
    while (true) {
        let question = realine.question("ASk me question");
        if (question === "exit") {
            break;
        }
        history.push({
            type: "user_input",
            content: [{ type: "text", text: question }]
        });
        const interaction1 = await ai.interactions.create({
            model: "gemini-3.5-flash",
            store: false,
            input: history
        });
        console.log("Response 1:", interaction1.steps.at(-1).content[0].text);

        history.push(...interaction1.steps);
    }
}

await main();