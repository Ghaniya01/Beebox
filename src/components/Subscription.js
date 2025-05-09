import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Subscription = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


  useEffect(() => {
    const fetchSubscriptionsAndVideos = async () => {
      const accessToken = localStorage.getItem('yt_access_token');
      if (!accessToken) {
        setError("Access token not found.");
        setLoading(false);
        return;
      }

      try {
        const subscriptionsRes = await axios.get(
          'https://www.googleapis.com/youtube/v3/subscriptions',
          {
            params: {
              part: 'snippet',
              mine: true,
              maxResults: 10,
              key: API_KEY,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
            },
          }
        );

        const subscriptions = subscriptionsRes.data.items;

        const videoPromises = subscriptions.map(async (sub) => {
          const channelId = sub.snippet.resourceId.channelId;

          const videosRes = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
              params: {
                part: 'snippet',
                channelId,
                order: 'date',
                maxResults: 1,
                key: API_KEY,
              },
            }
          );

          const latestVideo = videosRes.data.items[0];
          if (!latestVideo) return null;

          return {
            channelTitle: sub.snippet.title,
            channelThumbnail: sub.snippet.thumbnails.default.url,
            video: latestVideo,
            channelId,
          };
        });

        const videoResults = await Promise.all(videoPromises);
        setVideos(videoResults.filter(Boolean));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscriptions/videos:', err);
        setError("Failed to fetch subscriptions.");
        setLoading(false);
      }
    };

    fetchSubscriptionsAndVideos();
  }, []);

  return (
    <div className="bg-white min-h-screen w-full py-8 px-4 text-black">
      <h1 className="text-2xl mb-6 font-bold">Your Subscriptions</h1>

      {loading && <p className="text-gray-500">Loading subscriptions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-10">
        {videos.map((item) => {
          const videoId = item.video.id.videoId || item.video.id;
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

          return (
            <div key={`${item.channelId}-${videoId}`} className="flex flex-col items-center">
              {/* Channel Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.channelThumbnail}
                  alt={`${item.channelTitle} profile`}
                  className="rounded-full w-14 h-14"
                />
                <p className="text-xl font-semibold">{item.channelTitle}</p>
              </div>

              {/* Video Display */}
              <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg shadow-md overflow-hidden bg-white">
                <div className="md:w-1/2">
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.video.snippet.thumbnails.high.url}
                      alt={`Thumbnail for ${item.video.snippet.title}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="p-4 flex flex-col gap-2 md:w-1/2">
                  <h2 className="font-semibold text-lg md:text-xl">{item.video.snippet.title}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">{item.video.snippet.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.video.snippet.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
