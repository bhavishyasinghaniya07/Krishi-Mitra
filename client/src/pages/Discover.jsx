import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice.js";
import api from "../api/axios.js";

const Discover = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn } = useUser();

  // 🔍 Handle search when Enter is pressed
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        setLoading(true);
        const { data } = await api.post(
          "/api/user/discover",
          { input },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        if (data.success) setUsers(data.users);
        else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // 🧑‍🌾 Fetch all users initially (before any search)
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchData = async () => {
      try {
        const token = await getToken();
        if (token) {
          dispatch(fetchUser(token));
          setLoading(true);
          const { data } = await api.get("/api/user/all", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (data.success) setUsers(data.users);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, getToken, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Discover Farmers
          </h1>
          <p className="text-slate-600">
            Connect with amazing Farmers & Experts and grow your network
          </p>
        </div>

        {/* search bar */}
        <div className="mb-8 shadow-md border border-slate-200/60 bg-white/80">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Farmers by name, username, bio or location..."
                className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* users list */}
        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {loading && <div className="text-center py-10">Loading...</div>}
      </div>
    </div>
  );
};

export default Discover;
