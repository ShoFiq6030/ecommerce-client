"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import CategoryNavbar from "./CategoryNavbar";

export default function CategoryNavbarWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <CategoryNavbar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
