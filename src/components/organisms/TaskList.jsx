import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onEdit, 
  onDelete,
  groupBy = "none" 
}) => {
  const groupTasks = (tasks, groupBy) => {
    if (groupBy === "none") {
      return { "All Tasks": tasks };
    }

    if (groupBy === "priority") {
      return tasks.reduce((groups, task) => {
        const key = `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(task);
        return groups;
      }, {});
    }

    if (groupBy === "status") {
      return tasks.reduce((groups, task) => {
        const key = task.completed ? "Completed" : "Pending";
        if (!groups[key]) groups[key] = [];
        groups[key].push(task);
        return groups;
      }, {});
    }

    if (groupBy === "category") {
      return tasks.reduce((groups, task) => {
        const key = task.category || "No Category";
        if (!groups[key]) groups[key] = [];
        groups[key].push(task);
        return groups;
      }, {});
    }

    return { "All Tasks": tasks };
  };

  const groupedTasks = groupTasks(tasks, groupBy);
  const priorityOrder = ["High Priority", "Medium Priority", "Low Priority"];
  const statusOrder = ["Pending", "Completed"];

  const getSortedGroups = () => {
    const groups = Object.keys(groupedTasks);
    
    if (groupBy === "priority") {
      return groups.sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a);
        const bIndex = priorityOrder.indexOf(b);
        return aIndex - bIndex;
      });
    }
    
    if (groupBy === "status") {
      return groups.sort((a, b) => {
        const aIndex = statusOrder.indexOf(a);
        const bIndex = statusOrder.indexOf(b);
        return aIndex - bIndex;
      });
    }
    
    return groups.sort();
  };

  const sortedGroups = getSortedGroups();

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {sortedGroups.map((groupName, groupIndex) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: groupIndex * 0.1 }}
            className="space-y-3"
          >
            {groupBy !== "none" && (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 font-display">
                  {groupName}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {groupedTasks[groupName].length}
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {groupedTasks[groupName].map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;