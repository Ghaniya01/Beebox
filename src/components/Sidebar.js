import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiLogOut } from "react-icons/fi";
import trending from "../assets/Icons/trending.png";
import subscription from "../assets/Icons/subscription.png";
import profile from "../assets/Icons/profile.png";

export const Sidebar = ({ isCollapsed, category, setCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("home");

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "").toLowerCase();
    setSelected(currentPath || "home");
  }, [location.pathname]);

  const handleCategorySelection = (categoryIndex, pageName) => {
    setCategory(categoryIndex);
    navigate(`/${pageName.toLowerCase()}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("yt_access_token");
    navigate("/login"); // Change to your actual login route
  };

  const sidebarClass = `
    bg-grey h-full fixed top-0 left-0 z-50 transition-all duration-300
    ${isCollapsed ? "w-20 items-center" : "w-[288px] pl-8"} 
    flex flex-col justify-between pt-32 pb-10
  `;

  const buttonClass = (isActive) =>
    `flex items-center gap-3 ${isActive ? "text-[#925FE2]" : "text-textgrey"}`;

  return (
    <div className={sidebarClass}>
      {/* Top Menu Items */}
      <div className="flex flex-col gap-12">
        
      <button
       onClick={() => handleCategorySelection(0, "/")}
        className={buttonClass(selected === "/")}
      >
       <FiHome size={24} />
       {!isCollapsed && <span className="font-semibold">Home</span>}
       </button>


        <button
          onClick={() => handleCategorySelection(1, "Trending")}
          className={buttonClass(selected === "trending")}
        >
          <img
            src={trending}
            alt="Trending"
            className={`w-6 h-6 ${selected === "trending" ? "filter-purple" : ""}`}
          />
          {!isCollapsed && <span className="font-semibold">Trending</span>}
        </button>

        <button
          onClick={() => handleCategorySelection(2, "Subscriptions")}
          className={buttonClass(selected === "subscriptions")}
        >
          <img
            src={subscription}
            alt="Subscriptions"
            className={`w-6 h-6 ${selected === "subscriptions" ? "filter-purple" : ""}`}
          />
          {!isCollapsed && <span className="font-semibold">Subscriptions</span>}
        </button>

        <button
          onClick={() => handleCategorySelection(4, "Profile")}
          className={buttonClass(selected === "profile")}
        >
          <img
            src={profile}
            alt="Profile"
            className={`w-6 h-6 ${selected === "profile" ? "filter-purple" : ""}`}
          />
          {!isCollapsed && <span className="font-semibold">Profile</span>}
        </button>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-700"
        >
          <FiLogOut size={24} />
          {!isCollapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
};
