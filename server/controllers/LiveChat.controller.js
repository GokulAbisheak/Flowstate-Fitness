import Chat, { find } from "../models/LiveChat.model";

export async function getChats(req, res) {
  const { sender, receiver } = req.params;
  try {
    const chats = await find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: "asc" });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function saveChat(req, res) {
  const { sender, receiver, message } = req.body;
  try {
    const newChat = new Chat({
      sender: sender,
      receiver: receiver,
      message: message,
    });
    await newChat.save();
    res.status(201).json({ message: "Chat saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
