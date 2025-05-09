import uploadvideo from "../assets/Icons/uploadvideo.png";
import cancel from "../assets/Icons/cancel.png";
import upload from "../assets/Icons/upload.png";
import { useState } from "react";
import VideoUploader from "./VideoUploader";

export const Upload = () => {
  const [showCard, setShowCard] = useState(false);
  const toggleCard = () => setShowCard((prev) => !prev);

  return (
    <div className="relative">
      {/* Upload Button */}
      <button onClick={toggleCard}>
        <img src={upload} alt="upload" />
      </button>

      {/* Modal Backdrop (Click to Close) */}
      {showCard && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleCard}
        >
          {/* Modal Content (Clicking inside won't close it) */}
          <div
            className="bg-white border border-gray-300 rounded-3xl shadow-lg w-[90%] max-w-[1094px] h-[632px] flex flex-col items-center relative"
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            {/* Header (Title + Close Button) */}
            <div className="flex justify-between items-center w-full border-b pb-4 pt-4 border-gray-300">
              <p className="font-semibold text-[20px] pl-6">Upload</p>
              <button className="pr-6" onClick={toggleCard}>
                <img src={cancel} alt="Close" className="w-8 h-8" />
              </button>
            </div>

            {/* Upload Section (Fixed Issues) */}
            <VideoUploader uploadIcon={uploadvideo} />
          </div>
        </div>
      )}
    </div>
  );
};
