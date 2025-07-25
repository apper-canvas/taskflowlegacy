class TaskService {
  constructor() {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "order_c" } },
          { field: { Name: "category_c" } }
        ],
        orderBy: [
          { fieldName: "order_c", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform database response to match UI expectations
      return response.data.map(task => ({
        id: task.Id,
        title: task.title_c || task.Name,
        completed: task.completed_c || false,
        priority: task.priority_c || 'medium',
        dueDate: task.due_date_c,
        category: task.category_c?.Name || null,
        createdAt: task.created_at_c,
        order: task.order_c
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "order_c" } },
          { field: { Name: "category_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const task = response.data;
      return {
        id: task.Id,
        title: task.title_c || task.Name,
        completed: task.completed_c || false,
        priority: task.priority_c || 'medium',
        dueDate: task.due_date_c,
        category: task.category_c?.Name || null,
        createdAt: task.created_at_c,
        order: task.order_c
      };
    } catch (error) {
      console.error("Error fetching task:", error.message);
      throw error;
    }
  }

  async create(taskData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Name: taskData.title,
          title_c: taskData.title,
          completed_c: false,
          priority_c: taskData.priority || "medium",
          due_date_c: taskData.dueDate || null,
          category_c: taskData.category ? parseInt(taskData.category) : null,
          created_at_c: new Date().toISOString(),
          order_c: Date.now()
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create task');
        }

        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const task = successfulRecord.data;
          return {
            id: task.Id,
            title: task.title_c || task.Name,
            completed: task.completed_c || false,
            priority: task.priority_c || 'medium',
            dueDate: task.due_date_c,
            category: task.category_c?.Name || null,
            createdAt: task.created_at_c,
            order: task.order_c
          };
        }
      }
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      // Prepare updateable fields only
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed;
      }
      if (updates.priority !== undefined) {
        updateData.priority_c = updates.priority;
      }
      if (updates.dueDate !== undefined) {
        updateData.due_date_c = updates.dueDate;
      }
      if (updates.category !== undefined) {
        updateData.category_c = updates.category ? parseInt(updates.category) : null;
      }
      if (updates.order !== undefined) {
        updateData.order_c = updates.order;
      }

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update task');
        }

        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const task = successfulRecord.data;
          return {
            id: task.Id,
            title: task.title_c || task.Name,
            completed: task.completed_c || false,
            priority: task.priority_c || 'medium',
            dueDate: task.due_date_c,
            category: task.category_c?.Name || null,
            createdAt: task.created_at_c,
            order: task.order_c
          };
        }
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete task');
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  }
}

export default new TaskService();