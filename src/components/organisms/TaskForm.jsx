import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TaskForm = ({ onSubmit, categories = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
    category: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      ...formData,
      dueDate: formData.dueDate || null,
      category: formData.category || null
    };

    onSubmit(taskData);
    setFormData({
      title: "",
      priority: "medium", 
      dueDate: "",
      category: ""
    });
    setIsExpanded(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isExpanded) {
        setIsExpanded(true);
      } else {
        handleSubmit(e);
      }
    }
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* Quick Add Input */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="text-lg border-0 bg-transparent focus:ring-0 shadow-none p-0"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-primary-600"
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "Settings"} 
                className="w-5 h-5" 
              />
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!formData.title.trim()}
              className="shadow-lg"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Expanded Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-100 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField label="Priority">
                    <Select
                      value={formData.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </Select>
                  </FormField>

                  <FormField label="Due Date">
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange("dueDate", e.target.value)}
                      min={format(new Date(), "yyyy-MM-dd")}
                    />
                  </FormField>

                  <FormField label="Category">
                    <Select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
<option value="">No category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default TaskForm;