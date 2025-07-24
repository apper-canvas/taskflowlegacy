import mockTasks from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...mockTasks];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(task => task.id === parseInt(id));
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay();
    
    const newTask = {
      id: Math.max(...this.tasks.map(t => t.id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      category: taskData.category || null,
      createdAt: new Date().toISOString(),
      order: this.tasks.length + 1
    };

    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, updates) {
    await this.delay();
    
    const index = this.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...updates
    };

    return { ...this.tasks[index] };
  }

  async delete(id) {
    await this.delay();
    
    const index = this.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    this.tasks.splice(index, 1);
    return true;
  }

  async bulkUpdate(ids, updates) {
    await this.delay();
    
    const updatedTasks = [];
    for (const id of ids) {
      const index = this.tasks.findIndex(task => task.id === parseInt(id));
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updates
        };
        updatedTasks.push({ ...this.tasks[index] });
      }
    }

    return updatedTasks;
  }

  async search(query) {
    await this.delay();
    
    const lowerQuery = query.toLowerCase();
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      (task.category && task.category.toLowerCase().includes(lowerQuery))
    ).map(task => ({ ...task }));
  }
}

export default new TaskService();