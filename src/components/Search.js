import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // ✅ Get search query from URL
  const [videos, setVideos] = useState([]);
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


  useEffect(() => {
    if (query) {
      fetchVideos();
    }
  }, [query]);

  // ✅ Fetch Search Results from YouTube API
  const fetchVideos = async () => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const videoData = data.items.map((video) => ({
          id: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url,
          channelName: video.snippet.channelTitle,
        }));
        setVideos(videoData);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="ml-[288px] px-6 pt-12">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>

      {/* Display search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link to={`/watch/${video.id}`} key={video.id} className="w-full">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full rounded-lg" />
              </div>
              <h3 className="mt-3 text-sm font-bold">{video.title}</h3>
              <p className="text-xs text-gray-500">{video.channelName}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};
