import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import fs from "fs";
import ApiResponse from "../utils/ApiResponse";

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
    You are a pet detection model and you detect the features of the pet
    from the given image.
    Detect the image of the pet and tell it's feature in the given json format
    The breed feature has two enum one for cat and one for dogs choose accordingly you select the type
    Don't give any answer out of enum, if the none of the answers match enum return null simply for that key
    {
        type : enum(["dog","cat"]),
        breed : enum(["labrador","bulldog","german-shepherd","rottweiler","golden-retriever","others"]) | enum(["ragdoll","maine-coon","shorthair","persian","siberian","others"]),
        color : enum(["brown","white","gray","black","others"]),
    }
    Give the answer in the stringified format of the json, don't add any other things
    Try to find the answer of everything precisely and always as much as possible
    In worst case if you dont know the answer of any field return that field as null
    `;

function fileToGenerativePart(path: any, mimeType: any) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

const detectImage = asyncHandler(async (req: Request, res: Response) => {
    console.log("hi");
    const imagePath = req.file!.path;
    const imageParts = [
        fileToGenerativePart(imagePath, "image/png"),
        fileToGenerativePart(imagePath, "image/jpeg"),
        fileToGenerativePart(imagePath, "image/webp"),
    ];
    fs.unlinkSync(imagePath);
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    console.log(response.text())
    const text = JSON.parse(response.text());
    console.log(text);

    if(!["labrador","bulldog","german-shepherd","rottweiler","golden-retriever","others","ragdoll","maine-coon","shorthair","persian","siberian"].includes(text.breed)){
      text.breed = "others"
    }
    if(!["cat","dog"].includes(text.type)){
      text.type = null
      text.breed = null
    }
    if(!["brown","white","gray","black","others"].includes(text.color)){
      text.color = "others" 
    }
    res.status(200).json(new ApiResponse(200,{text}))
})


export { detectImage };
