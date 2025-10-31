import fs from "fs";
import imagekit from "../config/imageKit.js";
import Post from "../models/Post.js";
import { toFile } from "@imagekit/nodejs";

import User from "../models/User.js";

// Add Post
// export const addPost = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { content, post_type } = req.body;
//     const images = req.files;
//     let image_urls = [];
//     if (images.length) {
//       image_urls = await Promise.all(
//         images.map(async (image) => {
//           const fileBuffer = fs.readFileSync(image.path);
//           const response = await imagekit.files.upload({
//             file: fileBuffer,
//             fileName: image.originalname,
//             folder: "posts",
//           });

//           const url = imagekit.url({
//             path: response.filePath,
//             transformation: [
//               { quality: "auto" },
//               { format: "webp" },
//               { width: "1280" },
//             ],
//           });

//           return url;
//         })
//       );
//     }

//     await Post.create({
//       user: userId,
//       content,
//       image_urls,
//       post_type,
//     });
//     res.json({ success: true, message: "Post created successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const addPost = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { content, post_type } = req.body;
//     const images = req.files || [];
//     let image_urls = [];

//     if (images.length > 0) {
//       image_urls = await Promise.all(
//         images.map(async (image) => {
//           const fileBuffer = fs.readFileSync(image.path);

//           const response = await imagekit.files.upload({
//             file: fileBuffer,
//             fileName: image.originalname,
//             folder: "posts",
//           });

//           // cleanup temporary file
//           fs.unlinkSync(image.path);

//           // return hosted image URL
//           return response.url;
//         })
//       );
//     }

//     await Post.create({
//       user: userId,
//       content,
//       image_urls,
//       post_type,
//     });

//     res.json({ success: true, message: "Post created successfully" });
//   } catch (error) {
//     console.error("Add post error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const addPost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const images = req.files; // comes from multer

    let image_urls = [];

    // ✅ check if any file was uploaded
    if (images && images.length > 0) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          // read file buffer
          const fileBuffer = fs.readFileSync(image.path);

          // ✅ convert buffer to ImageKit file object
          const fileObj = await toFile(fileBuffer, image.originalname);

          // ✅ upload to ImageKit
          const response = await imagekit.files.upload({
            file: fileObj,
            fileName: image.originalname,
            folder: "posts",
          });

          // ✅ return the direct uploaded URL
          return response.url;
        })
      );
    }

    // ✅ create post in DB
    await Post.create({
      user: userId,
      content,
      image_urls,
      post_type,
    });

    res.json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error("Add Post Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// get post

// export const getFeedPosts = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const user = await User.findById(userId);

//     // user connections and followings
//     const userIds = [userId, ...user.connections, ...user.following];
//     const posts = await Post.find({ user: { $in: userIds } })
//       .populate("user")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, posts });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    // ✅ 1. Get user's connections and following
    const userIds = [userId, ...user.connections, ...user.following];

    // ✅ 2. Get all default users (who should appear in everyone's feed)
    const defaultUsers = await User.find({ isDefault: true }).select("_id");

    // ✅ 3. Merge their IDs into the feed list (avoid duplicates)
    const allFeedUsers = [
      ...new Set([...userIds, ...defaultUsers.map((u) => u._id.toString())]),
    ];

    // ✅ 4. Fetch posts from these users
    const posts = await Post.find({ user: { $in: allFeedUsers } })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// like post

export const likePost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { postId } = req.body;

    const post = await Post.findById(postId);

    if (post.likes_count.includes(userId)) {
      post.likes_count = post.likes_count.filter((user) => user !== userId);
      await post.save();
      res.json({ sucess: true, message: "Post unliked" });
    } else {
      post.likes_count.push(userId);
      await post.save();
      res.json({ success: true, message: "Post Liked" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
