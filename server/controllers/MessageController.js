import fs from "fs";
import imagekit from "../config/imageKit.js";
import Message from "../models/Message.js";
import { toFile } from "@imagekit/nodejs";

// create an empty object to store ss event connections
const connections = {};

// controller function for the sse endpoint
export const sseController = (req, res) => {
  const { userId } = req.params;

  // set sse headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // add the clients response object to the connections object
  connections[userId] = res;

  // send an initial event to the client

  res.write("log : Connected to SSE stream/n/n");

  // handle client disconnection
  req.on("close", () => {
    // remove the clients response
    delete connections[userId];
  });
};

// send message

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = "";
    let message_type = image ? "image" : "text";

    if (message_type === "image") {
      const fileBuffer = fs.readFileSync(image.path);
      const fileObj = await toFile(fileBuffer, image.originalname);

      const response = await imagekit.files.upload({
        file: fileObj,
        fileName: image.originalname,
      });

      media_url = response.url; // ✅ Use the uploaded file URL
    }

    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
    });

    res.json({ success: true, message });

    // Send message through SSE if user connected
    const messageWithUserData = await Message.findById(message._id).populate(
      "from_user_id"
    );

    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data: ${JSON.stringify(messageWithUserData)}\n\n`
      );
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// get chat messages

export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;

    const message = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id: to_user_id, to_user_id: userId },
      ],
    }).sort({ createdAt: -1 });

    // mark message as seen
    await Message.updateMany(
      { from_user_id: to_user_id, to_user_id: userId },
      { seen: true }
    );

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserRecentMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const message = await Message.find({ to_user_id: userId })
      .populate("from_user_id to_user_id")
      .sort({ created_at: -1 });

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
