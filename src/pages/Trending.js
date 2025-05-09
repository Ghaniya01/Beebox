import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { useState } from "react";
import { Trending } from "../Components/Trending";

export const TrendingPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Fixed Navbar */}
      <Navbar
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* ✅ Mobile Sidebar Overlay */}
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

      {/* ✅ Main layout below Navbar */}
      <div className="flex pt-[100px]">
        {/* ✅ Desktop Sidebar (visible on md+ only) */}
        <div className="hidden md:block fixed top-[100px] h-[calc(100vh-100px)] z-30">
          <Sidebar
            category={category}
            setCategory={setCategory}
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* ✅ Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[0px]"
          }`}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <Trending category={category} isCollapsed={isSidebarCollapsed} />
          </div>
        </div>
      </div>
    </div>
  );
};
