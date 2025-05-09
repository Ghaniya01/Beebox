import { PlayVideo } from "../components/Video";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

export const Play = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [category, setCategory] = useState(0);
  
    return (
      <div className="flex h-screen">
        {/* ✅ Fixed Sidebar */}
        <Sidebar category={category} setCategory={setCategory} isCollapsed={isSidebarCollapsed} />

        {/* ✅ Main Content (Properly Adjusts to Sidebar Expansion) */}
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? "ml-[50px]" : "ml-[288px]"} flex flex-col w-full`}>
          <Navbar toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
  
          {/* ✅ Ensure Video is Fully Visible & Aligned */}
          <div className="p-8 mt-20 overflow-auto w-full max-w-[1400px] mx-auto">
            <PlayVideo />
          </div>
        </div>
      </div>
    );
};
