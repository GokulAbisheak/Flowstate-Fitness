import { Router } from "express";
const router = Router();
import Image from "../model/image";

router.post("/store-image", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ msg: "Please enter an icon url" });
    }
    let newImage = new Image({
      image,
    });
    newImage = await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default communityRouter;