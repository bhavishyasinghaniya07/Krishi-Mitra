import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import Messages from "../src/pages/Messages.jsx";
import Feed from "../src/pages/Feed.jsx";
import Profile from "../src/pages/Profile.jsx";
import Connections from "../src/pages/Connections.jsx";
import Discover from "../src/pages/Discover.jsx";
import CreatePost from "../src/pages/CreatePost.jsx";
import Chatbox from "../src/pages/Chatbox.jsx";
import { useUser, useAuth } from "@clerk/clerk-react";
import Layout from "../src/pages/Layout.jsx";
import toast, { Toaster } from "react-hot-toast";
import WeatherPage from "./pages/Weather.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchConnections } from "./features/connections/connectionSlice";
import { addMessages } from "./features/messages/messagesSlice.js";
import Notification from "./components/Notification.jsx";
import APMC from "./pages/APMC.jsx";
import FarmerSchemesPortal from "./pages/FarmerSchemesPortal.jsx";

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchUser(token));
        dispatch(fetchConnections(token));
      }
    };
    fetchData();
  }, [user, getToken, dispatch]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(
        import.meta.env.VITE_BASEURL + "/api/message/" + user.id
      );

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (pathnameRef.current === "/message/" + message.from_user_id._id) {
          dispatch(addMessages(message));
        } else {
          toast.custom((t) => <Notification t={t} message={message} />, {
            position: "bottom-right",
          });
        }
      };
    }
  }, [user, dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Chatbox />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/apmc" element={<APMC />} />
          <Route path="/schemes" element={<FarmerSchemesPortal />} />
          <Route path="/messages/:profileId" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
