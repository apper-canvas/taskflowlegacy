import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-whisper">
      <Outlet />
    </div>
  );
};

export default Layout;