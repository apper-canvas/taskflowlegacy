import React from "react";
import { motion } from "framer-motion";
import FilterChip from "@/components/molecules/FilterChip";
import SearchBar from "@/components/molecules/SearchBar";

const TaskFilters = ({ 
  filters, 
  onFilterChange, 
  categories = [], 
  taskCounts = {} 
}) => {
  const filterOptions = [
    { key: "all", label: "All", icon: "List", count: taskCounts.total },
    { key: "pending", label: "Pending", icon: "Circle", count: taskCounts.pending },
    { key: "completed", label: "Completed", icon: "CheckCircle2", count: taskCounts.completed },
    { key: "today", label: "Today", icon: "Calendar", count: taskCounts.today },
    { key: "overdue", label: "Overdue", icon: "AlertTriangle", count: taskCounts.overdue }
  ];

  const priorityFilters = [
    { key: "high", label: "High Priority", icon: "AlertCircle", count: taskCounts.high },
    { key: "medium", label: "Medium Priority", icon: "Circle", count: taskCounts.medium },
    { key: "low", label: "Low Priority", icon: "Minus", count: taskCounts.low }
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={(e) => onFilterChange("search", e.target.value)}
        placeholder="Search tasks..."
        className="max-w-md"
      />

      {/* Status Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option, index) => (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FilterChip
                label={option.label}
                icon={option.icon}
                count={option.count}
                active={filters.status === option.key}
                onClick={() => onFilterChange("status", option.key)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Priority</h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All Priorities"
            icon="MoreHorizontal"
            active={!filters.priority}
            onClick={() => onFilterChange("priority", "")}
          />
          {priorityFilters.map((option, index) => (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <FilterChip
                label={option.label}
                icon={option.icon}
                count={option.count}
                active={filters.priority === option.key}
                onClick={() => onFilterChange("priority", option.key)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All Categories"
              icon="Tag"
              active={!filters.category}
              onClick={() => onFilterChange("category", "")}
            />
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                <FilterChip
                  label={category.name}
                  icon="Tag"
                  count={category.taskCount}
                  active={filters.category === category.name}
                  onClick={() => onFilterChange("category", category.name)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;