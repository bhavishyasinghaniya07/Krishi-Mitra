import React from "react";
import { Route, Routes } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import WeatherPage from "./pages/Weather.jsx";
import { useEffect } from "react";

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (user) {
      getToken().then((token) => console.log(token));
    }
  }, [user]);
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
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/messages/:profileId" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
