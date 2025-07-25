import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";
const Header = ({ totalTasks, completedTasks, todayTasks }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-600">Organize your day</p>
            </div>
          </div>
{/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-600">
                  {user.emailAddress}
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-error"
            >
              <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6">
            {/* Progress Ring */}
            <div className="relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-200"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5B47E0" />
                    <stop offset="100%" stopColor="#8B7FE8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-600">
                  {completionPercentage}%
                </span>
              </div>
            </div>

            {/* Task Stats */}
            <div className="hidden sm:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {totalTasks}
                </div>
                <div className="text-xs text-gray-600 font-medium">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {completedTasks}
                </div>
                <div className="text-xs text-gray-600 font-medium">Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">
                  {todayTasks}
                </div>
                <div className="text-xs text-gray-600 font-medium">Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;