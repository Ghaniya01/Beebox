import React, { useState } from 'react';
import { Navbar } from "../components/Navbar";
import { Subscription } from '../components/Subscription';
import { Sidebar } from "../components/Sidebar";

export const Subscriptions = () => {
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

      {/* ✅ Main Layout below fixed navbar */}
      <div className="flex pt-[100px]">
        {/* ✅ Desktop Sidebar (only shown on md+ screens) */}
        <div className="hidden md:block fixed top-[100px] h-[calc(100vh-100px)] z-40">
          <Sidebar
            category={category}
            setCategory={setCategory}
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* ✅ Main Content (shifts based on collapse state) */}
        <main
          className={`
            w-full transition-all duration-300
            px-4 sm:px-6 md:px-10 lg:px-20
            ${isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[288px]"}
          `}
        >
          <Subscription category={category} isCollapsed={isSidebarCollapsed} />
        </main>
      </div>
    </div>
  );
};
