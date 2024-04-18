import {
    addMessage,
    getChatContainingUser,
    getMessagesBetweenTwoUsers,
} from "../controllers/userChat.controller";
import express from "express";

const router = express.Router();

router.post("/getchats", async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send("userId is missing");
    }
    const chatsContainingUser = await getChatContainingUser(userId);

    res.json(chatsContainingUser);
});

router.post("/createchat", async (req, res) => {
    const { userId1, userId2, name1, name2 } = req.body;
    if (!userId1 || !userId2 || !name1 || !name2) {
        res.status(400).send(
            "userId1 and/or userId2 and/or name1 and/or nam2 is missing"
        );
    }
    const chat = await getMessagesBetweenTwoUsers(
        userId1,
        userId2,
        name1,
        name2
    );

    res.json(chat);
});

router.post("/getmessages", async (req, res) => {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) {
        res.status(400).send(
            "userId1 and/or userId2 and/or name1 and/or nam2 is missing"
        );
    }
    const chat = await getMessagesBetweenTwoUsers(userId1, userId2);

    res.json(chat);
});

router.post("/sendmessage", async (req, res) => {
    const { userId1, userId2, message } = req.body;
    console.log(message);

    if (!userId1 || !userId2 || !message) {
        res.status(400).send(
            "userId1 and/or userId2 and/or message is missing"
        );
    }
    const chat = await addMessage(userId1, userId2, message);
    res.json(chat);
});

export default router;
