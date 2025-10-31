import imagekit from "../config/imageKit.js";
import fs from "fs";
import User from "../models/User.js";
import Post from "../models/Post.js";
import ImageKit from "@imagekit/nodejs";
import Connection from "../models/Connection.js";
import { inngest } from "../inngest/index.js";

const client = new ImageKit();

// get user data using userID

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user data using userID

export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { username, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);

    if (tempUser.username !== username) {
      const user = User.findOne({ username });
      if (user) {
        // not change the username if already taken
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
    };

    const profile = req.files.profile && req.files.profile[0];

    const cover = req.files.cover && req.files.cover[0];

    if (profile) {
      const buffer = fs.readFileSync(profile.path);
      const response = await client.files.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transfomation: [
          { quality: "auto" },
          { format: "webp" },
          { witdth: "512" },
        ],
      });

      updateUserData.profile_picture = url;
    }

    if (cover) {
      const buffer = fs.readFileSync(cover.path);
      const response = await client.files.upload({
        file: buffer,
        fileName: cover.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transfomation: [
          { quality: "auto" },
          { format: "webp" },
          { witdth: "1280" },
        ],
      });

      updateUserData.cover_photo = url;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res.json({ success: true, user, message: "profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// This one is according to the latest version

// export const updateUserData = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     let { username, bio, location, full_name } = req.body;

//     const tempUser = await User.findById(userId);

//     if (tempUser.username !== username) {
//       const userExists = await User.findOne({ username });
//       if (userExists) {
//         username = tempUser.username; // keep old username if already taken
//       }
//     }

//     const updatedData = { username, bio, location, full_name };

//     const profile = req.files?.profile?.[0];
//     const cover = req.files?.cover?.[0];

//     // Upload profile picture
//     if (profile) {
//       const buffer = fs.readFileSync(profile.path);
//       const uploaded = await client.files.upload({
//         file: buffer,
//         fileName: profile.originalname,
//       });

//       const profileUrl = client.helper.buildSrc({
//         urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//         src: uploaded.filePath,
//         transformation: [{ quality: "auto", format: "webp", width: 512 }],
//       });

//       updatedData.profile_picture = profileUrl;
//     }

//     // Upload cover photo
//     if (cover) {
//       const buffer = fs.readFileSync(cover.path);
//       const uploaded = await client.files.upload({
//         file: buffer,
//         fileName: cover.originalname,
//       });

//       const coverUrl = client.helper.buildSrc({
//         urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//         src: uploaded.filePath,
//         transformation: [{ quality: "auto", format: "webp", width: 1280 }],
//       });

//       updatedData.cover_photo = coverUrl;
//     }

//     const user = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });

//     res.json({ success: true, user, message: "Profile updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// find users using username , email , location and name

export const discoverUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        {
          username: new RegExp(input, "i"),
        },
        {
          email: new RegExp(input, "i"),
        },
        {
          full_name: new RegExp(input, "i"),
        },
        {
          location: new RegExp(input, "i"),
        },
      ],
    });

    const filterdUsers = allUsers.filter((user) => user._id !== userId);
    res.json({ success: true, users: filterdUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// follow any user

export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "You are already following this user",
      });
    }

    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);
    await toUser.save();

    res.json({ success: true, message: "Now you are following this user" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// unfollow a user

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);
    user.following = user.following.filter((user) => user !== id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.following = toUser.following.filter((user) => user !== userId);
    await toUser.save();

    res.json({
      success: true,
      message: "You are no longer following this user",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// send connection req

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    // can send only 20 connections in 24 hours

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const connectionRequest = await Connection.find({
      from_user_id: userId,
      createdAt: { $gt: last24Hours },
    });
    if (connectionRequest.length >= 20) {
      return res.jso({
        success: false,
        message:
          "You have sent more than 20 connection request in last 24 hours , try again tommorow",
      });
    }

    // if usrs are already connected

    const connection = await Connection.findOne({
      $or: [
        {
          from_user_id: userId,
          to_user_id: id,
        },
        {
          from_user_id: id,
          to_user_id: userId,
        },
      ],
    });

    if (!connection) {
      const newConnection = await Connection.create({
        from_user_id: userId,
        to_user_id: id,
      });

      await inngest.send({
        name: "app/connection-request",
        data: { connectionId: newConnection._id },
      });
      return res.json({
        success: true,
        message: "Connection request sent sucessfully",
      });
    } else if (connection && connection.status === "accepted") {
      return res.json({
        success: false,
        message: "You are already connected with this user",
      });
    }

    return res.json({ success: false, message: "Connection request pending" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user connections

export const getUserConnections = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Missing user ID" });
    }

    // ✅ Check if collections even exist
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message:
          "User not found. The database may have been reset or user data deleted.",
        connections: [],
        followers: [],
        following: [],
        pendingConnections: [],
      });
    }

    // ✅ Fetch safely, even if relations are missing
    const user = await User.findById(userId).populate({
      path: "connections followers following",
      options: { strictPopulate: false },
    });

    // ✅ Defensive fallback in case user object is partially broken
    const connections = Array.isArray(user?.connections)
      ? user.connections
      : [];
    const followers = Array.isArray(user?.followers) ? user.followers : [];
    const following = Array.isArray(user?.following) ? user.following : [];

    // ✅ Try fetching pending connections safely
    let pendingConnections = [];
    try {
      const pending = await Connection.find({
        to_user_id: userId,
        status: "pending",
      }).populate("from_user_id");

      pendingConnections = pending.map((connection) => connection.from_user_id);
    } catch (connErr) {
      console.warn("⚠️ Could not load pending connections:", connErr.message);
      pendingConnections = [];
    }

    // ✅ Return full safe response
    return res.status(200).json({
      success: true,
      connections,
      followers,
      following,
      pendingConnections,
    });
  } catch (error) {
    console.error("❌ getUserConnections error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching connections. Possible causes: database reset, missing collections, or schema mismatch.",
      details: error.message,
    });
  }
};

// accept connection request

// export const acceptConnectionRequest = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { id } = req.body;

//     const connection = await Connection.findOne({
//       from_user_id: id,
//       to_user_id: userId,
//     });

//     if (!connection) {
//       return res.json({ success: false, message: "Connection not found" });
//     }
//     const user = await User.findById(userId);
//     user.connections.push(id);
//     await user.save();

//     const toUser = await User.findById(id);
//     toUser.connections.push(userId);
//     await toUser.save();

//     connection.status = "accepted";
//     await connection.save();

//     res.json({ success: false, message: error.message });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    // Find the pending connection
    const connection = await Connection.findOne({
      from_user_id: id,
      to_user_id: userId,
    });

    if (!connection) {
      return res.json({ success: false, message: "Connection not found" });
    }

    // Add each user to the other's connections list
    const user = await User.findById(userId);
    const toUser = await User.findById(id);

    if (!user || !toUser) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.connections.includes(id)) user.connections.push(id);
    if (!toUser.connections.includes(userId)) toUser.connections.push(userId);

    await user.save();
    await toUser.save();

    // Update connection status
    connection.status = "accepted";
    await connection.save();

    // ✅ Send proper success response
    return res.json({
      success: true,
      message: "Connection accepted successfully",
    });
  } catch (error) {
    console.error("Accept connection error:", error);
    res.json({ success: false, message: error.message });
  }
};

// get user profiles

export const getUserProfiles = async (req, res) => {
  try {
    const { profileId } = req.body;
    const profile = await User.findById(profileId);
    if (!profile) {
      return res.json({ sucess: false, message: "Profile not found" });
    }
    const posts = await Post.find({ user: profileId }).populate("user");
    res.json({ success: true, profile, posts });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
