import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
          <div className="hidden sm:flex items-center space-x-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-1">
                <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                <div className="h-3 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="w-16 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="space-y-6 mb-8">
        <div className="max-w-md h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
        
        <div className="space-y-4">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-3">
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((chip) => (
                  <div 
                    key={chip} 
                    className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task List Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((task, index) => (
          <motion.div
            key={task}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
                    <div className="flex items-center space-x-3">
                      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                      <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
                      <div className="h-6 w-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;