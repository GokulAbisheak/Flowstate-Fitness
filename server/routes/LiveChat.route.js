import express from 'express';
import messageController from '../controllers/LiveChat.controller.js';


const livechatRouter = express.Router();


livechatRouter.post('/send', messageController.sendMessage);
livechatRouter.get('/:sender/:receiver', messageController.getMessages);

module.exports = livechatRouter;
