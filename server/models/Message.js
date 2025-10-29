import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from_user_id: { type: String, ref: "User", requrired: true },
    to_user_id: { type: String, ref: "User", requrired: true },
    text: { type: String, trim: true },
    message_type: { type: String, enum: ["text", "image"] },
    media_url: { tupe: String },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
