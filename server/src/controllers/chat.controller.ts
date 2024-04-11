import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { StringOutputParser } from "@langchain/core/output_parsers";

const chatWithAi = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const client = req.client;
    const { sessionId, message } = req.body;
    console.log(req.body);

    if (!sessionId || !message) {
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
      streaming: true,
    });

    const prompt = new PromptTemplate({
      template: `You are an AI assistant specializing in dogs and cats. you possesses extensive knowledge on various aspects of these animals, ranging from behavior and training to health and nutrition. 

      Please note that you are specifically tailored to address inquiries related to dogs and cats. If you are asked about topics unrelated to these animals, you should respond with "I am not an expert in that field"

        \n\nCurrent conversation:\n{history}\nHuman: {message}\nAI:`,
      inputVariables: ["history", "message"],
    });

    const collection = client.db("cuddly_db").collection("chat-history");

    const memory = new BufferMemory({
      chatHistory: new MongoDBChatMessageHistory({
        collection,
        sessionId,
      }),
    });

    const chain = new ConversationChain({
      llm: model,
      memory,
      verbose: false,
      prompt: prompt,
    });
    // chain.outputParser = new StringOutputParser();

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const res1 = await chain.call({
      message,
      callbacks: [
        {
          handleLLMNewToken(data: string) {
            console.log("--------------------");
            console.log(data);

            res.write(data);
          },
          handleLLMEnd(data: string) {
            console.log("``````````````````````````");
            res.end();
          },
        },
      ],
    });

    // for await (const chunk of res1) {
    //   console.log(chunk);
    // }
    // res.json("noice");
    // return res.status(200).json(new ApiResponse(200, { res1 }));
  }
);

const fetchChatMessage = asyncHandler(async (req: Request, res: Response) => {
  const client = req.client;
  const sessionId = req.params.sessionId;

  if (!sessionId) {
    throw new ApiError(401, "All feilds are required");
  }

  const collection = client.db("cuddly_db").collection("chat-history");

  const chat = new MongoDBChatMessageHistory({
    collection,
    sessionId,
  });
  const messages = await chat.getMessages();

  return res.status(200).json(new ApiResponse(200, { messages }));
});

export { chatWithAi, fetchChatMessage };
