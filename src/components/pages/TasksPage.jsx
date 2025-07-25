import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { isToday, isPast, parseISO } from "date-fns";
import Header from "@/components/organisms/Header";
import TaskForm from "@/components/organisms/TaskForm";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import TaskService from "@/services/api/TaskService";
import CategoryService from "@/services/api/CategoryService";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "",
    category: ""
  });

  // Load data
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        TaskService.getAll(),
        CategoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Search filter
if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.category && task.category.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.status !== "all") {
      switch (filters.status) {
case "pending":
          filtered = filtered.filter(task => !task.completed);
          break;
        case "completed":
          filtered = filtered.filter(task => task.completed);
          break;
        case "today":
          filtered = filtered.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = typeof task.dueDate === "string" ? parseISO(task.dueDate) : task.dueDate;
            return isToday(dueDate);
          });
          break;
        case "overdue":
          filtered = filtered.filter(task => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = typeof task.dueDate === "string" ? parseISO(task.dueDate) : task.dueDate;
            return isPast(dueDate) && !isToday(dueDate);
          });
          break;
        default:
          break;
      }
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Sort by priority, then by creation date
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [tasks, filters]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const today = tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = typeof task.dueDate === "string" ? parseISO(task.dueDate) : task.dueDate;
      return isToday(dueDate);
    }).length;
    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = typeof task.dueDate === "string" ? parseISO(task.dueDate) : task.dueDate;
      return isPast(dueDate) && !isToday(dueDate);
    }).length;
    const high = tasks.filter(task => task.priority === "high").length;
    const medium = tasks.filter(task => task.priority === "medium").length;
    const low = tasks.filter(task => task.priority === "low").length;

    return { total, completed, pending, today, overdue, high, medium, low };
  }, [tasks]);

  // Handlers
const handleAddTask = async (taskData) => {
    try {
      const newTask = await TaskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = await TaskService.update(taskId, {
        completed: !task.completed
      });
      
      setTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

const handleEditTask = async (taskId, updates) => {
    try {
      const updatedTask = await TaskService.update(taskId, updates);
      setTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleScrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-whisper">
      <Header 
        totalTasks={taskCounts.total}
        completedTasks={taskCounts.completed}
        todayTasks={taskCounts.today}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Task Form */}
          <TaskForm 
            onSubmit={handleAddTask}
            categories={categories}
          />

          {/* Filters */}
          <TaskFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            taskCounts={taskCounts}
          />

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            tasks.length === 0 ? (
              <Empty
                title="Ready to get organized?"
                description="Create your first task and start building productive habits that last."
                actionLabel="Add Your First Task"
                onAction={handleScrollToForm}
              />
            ) : (
              <Empty
                title="No tasks match your filters"
                description="Try adjusting your search or filter criteria to find what you're looking for."
                actionLabel="Clear Filters"
                onAction={() => setFilters({ search: "", status: "all", priority: "", category: "" })}
              />
            )
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              groupBy={filters.status === "all" ? "priority" : "none"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;