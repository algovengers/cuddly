import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../utils/prisma";
import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";
// const { PromptTemplate } = require("@langchain/core/prompts");
// const { ConversationChain } = require("langchain/chains");
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";

import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const chatWithAi = asyncHandler(async (req: Request, res: Response) => {
  const { emailId, message } = req.body;

  if (!emailId || !message) {
    throw new ApiError(401, "All feilds are required");
  }

  // this checking can be removed if we are having time issues
  //   const userExists = await prisma.user.findFirst({
  //     where: { emailId },
  //   });

  //   if (!userExists) {
  //     throw new ApiError(
  //       401,
  //       "The user doesn't exits and is trying to acces the chatWithAI"
  //     );
  //   }

  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    temperature: 0.2,
  });

  const prompt = new PromptTemplate({
    template: `you are an AI bot and you task is to answer the question asked the human to best of your knowledge
        \n\nCurrent conversation:\n{history}\nHuman: {message}\nAI:`,
    inputVariables: ["history", "message"],
  });

  const client = new MongoClient(process.env.MONGO_URI || "", {
    driverInfo: { name: "langchainjs" },
  });

  await client.connect();
  const collection = client.db("cuddly_db").collection("chat-history");
  const sessionId = "rohit";

  const memory = new BufferMemory({
    chatHistory: new MongoDBChatMessageHistory({
      collection,
      sessionId,
    }),
  });

  const chain = new ConversationChain({
    llm: model,
    memory,
    prompt: prompt,
  });

  const res1 = await chain.call({
    message,
  });

  console.log(res1);

  const messageAdded = await prisma.chatHistory.update({
    where: { sessionId },
    data: { ...res1 },
  });
  console.log(messageAdded);

  return res.status(200).json(new ApiResponse(200, { res1 }));
});

export { chatWithAi };
