import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../assets/Icons/menu.png";
import minilogo from "../assets/Icons/minilogo.png";
import mute from "../assets/Icons/mute.png";
import { FiBell, FiSearch } from "react-icons/fi";
import profilepicture from "../assets/Images/profilepicture.png";
import { Upload } from "./Upload";

export const Navbar = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Hamburger & Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile: toggle mobile sidebar */}
          <button onClick={toggleMobileSidebar} className="md:hidden">
            <img src={menu} alt="menu" className="w-7 h-7" />
          </button>

          {/* Desktop: toggle collapse */}
          <button onClick={toggleSidebar} className="hidden md:block">
            <img src={menu} alt="menu" className="w-7 h-7" />
          </button>

          <button onClick={() => navigate("/home")}>
            <img src={minilogo} alt="logo" className="w-[120px] h-auto" />
          </button>
        </div>

        {/* Desktop search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="border-2 rounded-lg w-full max-w-[500px] lg:max-w-[622px] h-[40px] px-4"
          />
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="md:hidden">
            <FiSearch className="w-6 h-6" />
          </button>

          <button className="hidden md:block">
            <img src={mute} alt="mute" className="w-[40px] h-[40px]" />
          </button>

          <button>
            <FiBell className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]" />
          </button>

          <button>
            <img src={profilepicture} alt="Profile" className="w-[36px] h-[36px] md:w-[45px] md:h-[45px] rounded-full" />
          </button>

          <div className="hidden lg:block">
            <Upload />
          </div>
        </div>
      </div>

      {/* Mobile Search Field */}
      {showMobileSearch && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border-2 rounded-lg h-[40px] px-4"
          />
        </form>
      )}
    </div>
  );
};
