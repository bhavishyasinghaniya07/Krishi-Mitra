import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

const ProfileModel = ({ setshowEdit }) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-110 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>
          <form action="" className="space-y-4 " onSubmit={handleSaveProfile}>
            {/* profile picture  */}
            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture
                <input
                  hidden
                  className="w-full p-3 border border-gray-200 rounded-lg cursor-pointer"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      profile_picture: e.target.files[0],
                    })
                  }
                  accept="image/*"
                  id="profile_picture"
                  type="file"
                />
                <div className="group/profile relative">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(editForm.profile_picture)
                        : user.profile_picture
                    }
                    alt=""
                    className="w-24 h-24 rounded-full object-cover mt-2"
                  />
                  <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center">
                    <Pencil className=" cursor-pointer w-5 h-5 text-white " />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div className="flex flex-col items-start gap-3">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="cover_photo"
              >
                Cover Photo
              </label>

              <input
                hidden
                id="cover_photo"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0],
                  })
                }
              />

              <label
                htmlFor="cover_photo"
                className="group/cover relative cursor-pointer"
              >
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt="cover"
                  className="w-80 h-40 rounded-lg bg-gradient-to-r from-green-200 via-yellow-200 to-pink-200 object-cover mt-2"
                />
                <div className="absolute hidden group-hover/cover:flex top-0 bottom-0 left-0 right-0 bg-black/20 rounded-lg items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </label>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor=""
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
                value={editForm.full_name}
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg "
                placeholder="Please Enter Your Full Name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor=""
              >
                UserName
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                value={editForm.username}
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg "
                placeholder="Please Enter UserName"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor=""
              >
                Bio
              </label>
              <textarea
                rows={3}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                value={editForm.bio}
                className="w-full p-3 border border-gray-200 rounded-lg "
                placeholder="Please Enter Bio"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor=""
              >
                Location
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                value={editForm.location}
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg "
                placeholder="Please Enter Your Location"
              />
            </div>
            <div className="flex justify-end scroll-px-3 pt-6 gap-2">
              <button
                type="button"
                onClick={() => setshowEdit(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
