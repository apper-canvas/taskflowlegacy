import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Start by adding your first task to get organized",
  actionLabel = "Add Your First Task",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary-600" />
        </motion.div>
        
        {/* Floating Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-400 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${80 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="accent"
          size="lg"
          className="shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionLabel}
        </Button>
      )}
      
      <div className="mt-8 grid grid-cols-3 gap-4 text-center max-w-sm">
        <div className="p-4 bg-white/80 rounded-xl border border-gray-100">
          <ApperIcon name="Zap" className="w-6 h-6 text-accent-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Quick Add</p>
        </div>
        <div className="p-4 bg-white/80 rounded-xl border border-gray-100">
          <ApperIcon name="Target" className="w-6 h-6 text-primary-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Set Priorities</p>
        </div>
        <div className="p-4 bg-white/80 rounded-xl border border-gray-100">
          <ApperIcon name="Trophy" className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-xs text-gray-600">Track Progress</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;