import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { useState } from "react";
import { SearchResults } from "../Components/Search";

export const Search = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar 
        category={category} 
        setCategory={setCategory} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} // ✅ Pass the toggle function to Sidebar
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-[20px]" : ""}`}>
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

        {/* Video Content */}
        <div className="p-8 mt-20">
          <SearchResults category={category} isCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </div>
  );
};
