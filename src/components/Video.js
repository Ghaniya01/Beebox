import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHeart, FiSave } from "react-icons/fi"; 

export const PlayVideo = () => {
  const { videoId } = useParams(); 
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [comments, setComments] = useState([]); 
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


  //  Fetch video details
  const fetchVideoDetails = async () => {
    if (!videoId) return;
    try {
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        setVideoDetails(video);
        fetchChannelDetails(video.snippet.channelId); 
        fetchVideoComments(); 
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  //  Fetch channel details (to get profile image & subscriber count)
  const fetchChannelDetails = async (channelId) => {
    if (!channelId) return;
    try {
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
      const response = await fetch(channelUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setChannelDetails(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  //  Fetch video comments
  const fetchVideoComments = async () => {
    if (!videoId) return;
    try {
      const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=10&key=${API_KEY}`;
      const response = await fetch(commentsUrl);
      const data = await response.json();

      if (data.items) {
        const commentData = data.items.map((comment) => ({
          author: comment.snippet.topLevelComment.snippet.authorDisplayName,
          authorImage: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
          text: comment.snippet.topLevelComment.snippet.textDisplay,
          publishedAt: new Date(comment.snippet.topLevelComment.snippet.publishedAt).toDateString(),
        }));
        setComments(commentData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  //  Format subscriber count
  const formatSubs = (subscriberCounts) => {
    if (!subscriberCounts) return "N/A Subscribers";
    if (subscriberCounts >= 1000000) return (subscriberCounts / 1000000).toFixed(1) + "M Subscribers";
    if (subscriberCounts >= 1000) return (subscriberCounts / 1000).toFixed(1) + "K Subscribers";
    return subscriberCounts + " Subscribers";
  };

  if (!videoId) {
    return <div className="text-center text-gray-500">No video selected.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black px-4 mt-[20px]">
      <div className="w-full mx-auto max-w-[1200px]">
        {/*  Embedded YouTube Video */}
        <iframe
          className="w-full h-[300px] sm:h-[450px] md:h-[500px] lg:h-[350px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

        {/*  Video Information */}
        {videoDetails && (
          <div className="mt-4">
            <p className="text-2xl font-bold">{videoDetails.snippet.title}</p>
            <p className="text-gray-500">STARRING: Albert Manu, Elizabeth Benson, Josh Wales</p>

            {/*  Channel Information */}
            {channelDetails && (
              <div className="flex items-center mt-4 gap-4">
                <img
                  src={channelDetails.snippet.thumbnails.default.url}
                  alt={videoDetails.snippet.channelTitle}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">{videoDetails.snippet.channelTitle}</p>
                  <p className="text-gray-500 text-sm">
                    {formatSubs(channelDetails.statistics.subscriberCount)}
                  </p>
                </div>

                {/*  Subscribe Button */}
                <button className="bg-gray-300 text-black px-5 py-2 rounded-full font-semibold">
                  Subscribed
                </button>
                <button className="flex items-center gap-2 bg-[#925FE2] text-white px-5 py-2 rounded-full">
                  <FiHeart className="text-xl" /> Like
                </button>
                <button className="flex items-center gap-2 bg-gray-300 text-black px-5 py-2 rounded-full">
                  <FiSave className="text-xl" /> Save
                </button>
              </div>
            )}

            {/*  Comments Section */}
            <p className="mt-6 text-lg font-semibold">Comments</p>
            <div className="mt-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-4 mb-4 p-3 border-b">
                    <img
                      src={comment.authorImage}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-sm text-gray-500">{comment.publishedAt}</p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
