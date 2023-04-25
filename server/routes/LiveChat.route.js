
import express from  'express';
import chatController from '../controllers/LiveChat.controller.js';

const chatRouter = express.Router();

chatRouter.get("/:sender/:receiver", chatController.getChats);
chatRouter.post("/add/:sender", chatController.saveChat);

module.exports = chatRouter;
