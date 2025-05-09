import React, { useState } from "react";

const VideoUploader = ({ uploadIcon }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Handle video selection
  const handleVideoChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file); // Save the file
      setVideoPreview(URL.createObjectURL(file)); // Create a preview URL
    } else {
      alert("Please select a valid video file.");
    }
  };

  // Handle cancel (removes selected video)
  const handleCancel = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  // Handle video upload (simulated)
  const handleUpload = () => {
    if (!videoFile) {
      alert("No video selected!");
      return;
    }
    alert(`Uploading: ${videoFile.name}`);
    // Here, you can send `videoFile` to a backend server using FormData.
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Show Upload Image & Instructions if No Video Selected */}
      {!videoPreview && (
        <>
          <img src={uploadIcon} className="max-w-full h-auto mt-6" alt="Upload Video" />
          <p className="pt-4 text-[20px] font-semibold text-center">
            Drag and drop video files to upload
          </p>
          <p className="pt-4 text-[20px] font-semibold text-center">
            Your videos will be private until you publish them.
          </p>
        </>
      )}

      {/* File Input (Hidden but Triggered by Label) */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="hidden"
        id="fileInput" // Associate with label
      />

      {/* Label to Trigger File Input (Styled as a Button) */}
      {!videoPreview && (
        <label
          htmlFor="fileInput"
          className="w-[192px] h-[72px] bg-black text-white text-[24px] mt-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800"
        >
          Select File
        </label>
      )}

      {/* Video Preview with Cancel Button */}
      {videoPreview && (
        <div className="relative w-full max-w-lg mt-4">
          <video controls className="w-full max-h-[300px] rounded-lg shadow-md">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Cancel Button (Top-right corner of video) */}
          <button
            onClick={handleCancel}
            className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full hover:bg-red-700"
          >
            ✖ Cancel
          </button>
        </div>
      )}

      {/* Upload Button (Only if a Video is Selected) */}
      {videoFile && (
        <button
          onClick={handleUpload}
          className="bg-black text-white text-[20px] px-6 py-3 rounded-full mt-6 hover:bg-gray-800"
        >
          Upload Video
        </button>
      )}
    </div>
  );

};

export default VideoUploader;
