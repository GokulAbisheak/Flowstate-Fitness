const Message = require('../models/message.model');

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
