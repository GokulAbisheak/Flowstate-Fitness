import express from 'express';
import messageController from '../controllers/LiveChat.controller.js';

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.post('/send', messageController.sendMessage);
router.get('/:sender/:receiver', messageController.getMessages);

module.exports = router;
