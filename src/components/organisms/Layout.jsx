import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-whisper">
      <Outlet />
    </div>
  );
};
export default Layout;