import fs from "fs";
import imagekit from "../config/imageKit.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";
import { toFile } from "@imagekit/nodejs";

// add user story

// export const addUserStory = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { content, media_type, background_color } = req.body;
//     const media = req.file;
//     let media_urls = "";

//     //upload media to imagekit
//     if (media_type === "image" || media_type === "video") {
//       const fileBuffer = fs.readFileSync(media.path);
//       const response = await imagekit.files.upload({
//         file: fileBuffer,
//         fileName: media.originalname,
//       });
//       media_urls = response.url;
//     }

//     //create story

//     const story = await Story.create({
//       user: userId,
//       content,
//       media_urls,
//       media_type,
//       background_color,
//     });

//     // schedule story deletion in 24 hours

//     await inngest.send({
//       name: "app/story.delete",
//       data: { storyId: story._id },
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, background_color } = req.body;
    const media = req.file;

    let media_urls = "";

    if (media && (media_type === "image" || media_type === "video")) {
      // ✅ Read the file into a buffer
      const fileBuffer = fs.readFileSync(media.path);

      // ✅ Convert buffer into an ImageKit file object
      const fileObj = await toFile(fileBuffer, media.originalname);

      // ✅ Upload it properly
      const uploadResponse = await imagekit.files.upload({
        file: fileObj, // <-- Must be in this format
        fileName: media.originalname,
      });

      media_urls = uploadResponse.url;
    }

    // ✅ Continue saving story as usual
    const story = await Story.create({
      user: userId,
      content,
      media_urls,
      media_type,
      background_color,
    });

    res.json({ success: true, story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user story

export const getStories = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    // user connections and followings
    const userIds = [userId, ...user.connections, ...user.following];

    const stories = await Story.find({
      user: { $in: userIds },
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
