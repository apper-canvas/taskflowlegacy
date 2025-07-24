import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, parseISO } from "date-fns";
import { toast } from "react-toastify";
import TaskCheckbox from "@/components/molecules/TaskCheckbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryTag from "@/components/molecules/CategoryTag";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
    
    if (!task.completed) {
      // Trigger confetti effect
      const confettiColors = ["#5B47E0", "#8B7FE8", "#FFB547", "#22C55E"];
      toast.success("🎉 Task completed! Great job!", {
        position: "top-right",
        autoClose: 2000,
        style: {
          background: "linear-gradient(135deg, #5B47E0, #8B7FE8)",
          color: "white"
        }
      });
    }
  };

  const handleEdit = () => {
    if (isEditing && editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, { title: editTitle.trim() });
      toast.success("Task updated successfully");
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast.success("Task deleted");
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;
    
    const dueDate = typeof task.dueDate === "string" ? parseISO(task.dueDate) : task.dueDate;
    const isOverdue = isPast(dueDate) && !isToday(dueDate) && !task.completed;
    const isDueToday = isToday(dueDate);
    
    return {
      date: dueDate,
      isOverdue,
      isDueToday,
      formatted: format(dueDate, "MMM d")
    };
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <motion.div
      className={cn(
        "group relative bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75",
        dueDateInfo?.isOverdue && !task.completed && "border-l-4 border-l-error"
      )}
      whileHover={{ y: -1, scale: 1.01 }}
      layout
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-0.5">
          <TaskCheckbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              {isEditing ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleEdit}
                  onKeyDown={handleKeyDown}
                  className="text-base font-medium border-0 bg-transparent focus:ring-2 focus:ring-primary-200 p-0"
                  autoFocus
                />
              ) : (
                <h3 
                  className={cn(
                    "text-base font-medium text-gray-900 cursor-pointer hover:text-primary-600 transition-colors",
                    task.completed && "line-through text-gray-500"
                  )}
                  onClick={() => setIsEditing(true)}
                >
                  {task.title}
                </h3>
              )}
              
              {/* Meta Information */}
              <div className="flex items-center space-x-3 mt-2">
                <PriorityBadge priority={task.priority} />
                
                {task.category && (
                  <CategoryTag category={task.category} />
                )}
                
                {dueDateInfo && (
                  <div className={cn(
                    "flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full",
                    dueDateInfo.isOverdue && !task.completed 
                      ? "bg-red-100 text-red-800" 
                      : dueDateInfo.isDueToday 
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    <span>{dueDateInfo.formatted}</span>
                    {dueDateInfo.isOverdue && !task.completed && (
                      <ApperIcon name="AlertTriangle" className="w-3 h-3" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="text-gray-400 hover:text-primary-600"
              >
                <ApperIcon name={isEditing ? "Check" : "Edit3"} className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-gray-400 hover:text-error"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration */}
      {task.completed && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-2 right-2">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 180 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ApperIcon name="Sparkles" className="w-5 h-5 text-accent-500" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;