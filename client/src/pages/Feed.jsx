import React, { useEffect, useState } from "react";
import { dummyPostsData } from "../assets/assets";
import { assets } from "../assets/assets";
import Loading from "../components/Loading.jsx";
import StoriesBar from "../components/StoriesBar.jsx";
import Postcard from "../components/Postcard.jsx";
import RecentMessages from "../components/RecentMessages.jsx";
import { CloudSun } from "lucide-react";
import { Link } from "react-router-dom";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);
  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* stories and posts */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <Postcard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* right sidebar  */}
      <div className="max-xl:hidden sticky top-0 cursor-pointer">
        {/* WEATHER */}
        <Link to={"/weather"}>
          <div className=" max-w-xs w-85 bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow mb-2">
            <h3 className="flex items-center gap-1 ">
              <CloudSun size={14} /> Weather Update
            </h3>

            <p className="text-slate-600">Bhopal, Madhya Pradesh</p>
            <p className="text-slate-600">
              ☀️ 28°C | Feels like 30°C <br />
              💧 Humidity: 72% | 🌬️ Wind: 10 km/h <br />
            </p>
          </div>
        </Link>

        {/* SPONSERD  */}
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3>Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-70 h-40 rounded-md m-auto"
            alt=""
          />
          <p className="text-slate-600">Crop Advising</p>
          <p className="text-slate-600">
            Supercharge your farm’s productivity with Crop Advising. Our
            experienced agri-specialists help you choose the right crops,
            fertilizers, and techniques based on your soil and climate.
          </p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
