import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { prisma } from "../utils/prisma";

const getChatContainingUser = async (userId: string) => {
    const chatsContainingUser = await prisma.chat.findMany({
        where: {
            users: {
                some: {
                    userId,
                },
            },
        },
        include: {
            users: true,
        },
    });
    return chatsContainingUser;
};

const getMessagesBetweenTwoUsers = async (
    userId1: string,
    userId2: string,
    name1: string = "",
    name2: string = ""
) => {
    let chat;
    chat = await prisma.chat.findFirst({
        where: {
            AND: [
                { users: { some: { userId: userId1 } } },
                { users: { some: { userId: userId2 } } },
            ],
        },
        include: {
            messages: true,
        },
    });
    if (!chat) {
        chat = await prisma.chat.create({
            data: {
                users: {
                    createMany: {
                        data: [
                            { userId: userId1, name: name1 },
                            { userId: userId2, name: name2 },
                        ],
                    },
                },
            },
            include: {
                messages: true,
            },
        });
    }

    return chat;
};

const addMessage = async (
    userId1: string,
    userId2: string,
    message: { userId: string; message: string }
) => {
    try {
        const chat = await prisma.chat.findFirst({
            where: {
                AND: [
                    { users: { some: { userId: userId1 } } },
                    { users: { some: { userId: userId2 } } },
                ],
            },
            include: {
                messages: true,
            },
        });

        if (!chat) {
            throw new Error("Chat not found between the users");
        }

        // Update the chat with the new message
        const updatedChat = await prisma.chat.update({
            where: { id: chat.id },
            data: {
                messages: {
                    create: {
                        senderId: message.userId,
                        message: message.message,
                    },
                },
            },
            include: {
                messages: true,
            },
        });

        return updatedChat;
    } catch (error) {
        console.error("Error adding message to chat:", error);
    }
};

export { getChatContainingUser, getMessagesBetweenTwoUsers, addMessage };
