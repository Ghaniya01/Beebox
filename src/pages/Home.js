import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { ForYou } from "../components/ForYou";

export const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <div className="flex relative min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          category={category}
          setCategory={setCategory}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <Sidebar
            category={category}
            setCategory={setCategory}
            isCollapsed={false}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <div className="p-8 mt-20">
          <ForYou category={category} isCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </div>
  );
};
