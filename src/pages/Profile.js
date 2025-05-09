import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../Data';
import { Sidebar } from '../Components/Sidebar';
import { Navbar } from '../Components/Navbar';

export const Profile = () => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem('yt_access_token');
    if (!accessToken) {
      setError("Access token not found.");
      setLoading(false);
      return;
    }

    const fetchProfileAndVideos = async () => {
      try {
        const channelRes = await axios.get(
          'https://www.googleapis.com/youtube/v3/channels',
          {
            params: {
              part: 'snippet,statistics,contentDetails',
              mine: true,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
            },
          }
        );

        const channel = channelRes.data.items[0];
        setChannelInfo(channel);

        const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
        const videosRes = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              playlistId: uploadsPlaylistId,
              maxResults: 6,
              key: API_KEY,
            },
          }
        );

        setVideos(videosRes.data.items || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile/videos:', err);
        if (!channelInfo) {
          setError("Failed to fetch profile data.");
        }
        setLoading(false);
      }
    };

    fetchProfileAndVideos();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div className="relative top-[100px] h-[calc(100vh-100px)]">
            <Sidebar
              category={category}
              setCategory={setCategory}
              isCollapsed={false}
            />
          </div>
        </div>
      )}

      <div className="flex pt-[100px]">
        <div className="hidden md:block fixed top-[100px] h-[calc(100vh-100px)] z-30">
          <Sidebar
            category={category}
            setCategory={setCategory}
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        <main
          className={`w-full transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-20 ${
            isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[288px]"
          }`}
        >
          <div className="bg-white w-full py-8 text-black">
            {loading && <p className="text-gray-500">Loading profile...</p>}
            {error && !channelInfo && <p className="text-red-600">{error}</p>}

            {channelInfo && (
              <>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={channelInfo.snippet.thumbnails.default.url}
                    alt="Profile"
                    className="rounded-full w-24 h-24"
                  />
                  <h1 className="text-2xl font-semibold mt-2">{channelInfo.snippet.title}</h1>
                  <div className="flex flex-wrap justify-center gap-2 text-gray-600 text-sm mt-1">
                    <span>{channelInfo.snippet.customUrl || channelInfo.snippet.title}</span>
                    <span>•</span>
                    <span>{parseInt(channelInfo.statistics.subscriberCount).toLocaleString()} Subscribers</span>
                    <span>•</span>
                    <span>{channelInfo.statistics.videoCount} videos</span>
                  </div>
                  <div className="flex gap-4 mt-4 flex-wrap justify-center">
                    <button className="bg-gray-200 px-4 py-2 rounded-md">Switch Account</button>
                    <button className="bg-gray-200 px-4 py-2 rounded-md">Share Profile</button>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Videos Posted</h2>
                  {videos.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {videos.map((item, index) => {
                          const videoId = item.snippet.resourceId?.videoId || item.snippet.videoId;
                          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                          return (
                            <a
                              key={videoId || index}
                              href={videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative bg-gray-100 rounded-md overflow-hidden"
                            >
                              <img
                                src={item.snippet.thumbnails.high.url}
                                alt={item.snippet.title}
                                className="w-full h-32 object-cover"
                              />
                              <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                                15:00
                              </span>
                            </a>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
                        {videos.map((item, index) => (
                          <div key={index}>
                            <p className="font-medium truncate">{item.snippet.title}</p>
                            <p className="text-xs">
                              {new Date(item.snippet.publishedAt).toLocaleDateString()} • 68K views
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No video posted</p>
                  )}
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Draft</h2>
                  <p className="text-sm text-gray-500">No draft available</p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};