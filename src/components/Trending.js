import React, { useState, useEffect } from "react";
import { API_KEY } from "../Data";
import { Link } from "react-router-dom";

export const Trending = ({ isCollapsed }) => {
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    try {
      const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=GB&maxResults=12&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      const data = await response.json();

      if (data.items) {
        const videoData = await Promise.all(
          data.items.map(async (video) => {
            const channelImage = await fetchChannelImage(video.snippet.channelId);
            return {
              id: video.id,
              title: video.snippet.title,
              thumbnail: video.snippet.thumbnails.high.url,
              duration: formatDuration(video.contentDetails.duration),
              channelName: video.snippet.channelTitle,
              views: formatViews(video.statistics.viewCount),
              timeAgo: timeAgo(video.snippet.publishedAt),
              channelImage: channelImage || "https://via.placeholder.com/40",
            };
          })
        );
        setVideos(videoData);
      }
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  const fetchChannelImage = async (channelId) => {
    try {
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
      const response = await fetch(channelUrl);
      const data = await response.json();
      return data.items[0]?.snippet?.thumbnails?.high?.url;
    } catch (error) {
      console.error("Error fetching channel image:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].replace("H", ":") : "";
    const minutes = match[2] ? match[2].replace("M", ":") : "0:";
    const seconds = match[3] ? match[3].replace("S", "") : "00";
    return `${hours}${minutes}${seconds.length === 1 ? "0" + seconds : seconds}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M views";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K views";
    return views + " views";
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const diff = (new Date() - date) / 1000;
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (let interval of intervals) {
      const count = Math.floor(diff / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  return (
    <div
      className={`transition-all duration-300 px-4 sm:px-6 md:px-8 pt-12 w-full
        ${isCollapsed ? "md:ml-[50px]" : "md:ml-[288px]"}`}
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Most Popular</h2>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link to={`/watch/${video.id}`} key={video.id} className="w-full">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full rounded-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold line-clamp-2">{video.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={video.channelImage}
                      alt={video.channelName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-xs font-semibold">{video.channelName}</p>
                      <p className="text-xs text-gray-500">
                        {video.views} • {video.timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 col-span-full ">Loading videos...</p>
        )}
      </div>
    </div>
  );
};
