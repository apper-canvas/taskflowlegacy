class CategoryService {
  constructor() {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'category_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "task_count_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform database response to match UI expectations
      return response.data.map(category => ({
        id: category.Id,
        name: category.Name,
        color: category.color_c || "#5B47E0",
        taskCount: category.task_count_c || 0
      }));
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "task_count_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const category = response.data;
      return {
        id: category.Id,
        name: category.Name,
        color: category.color_c || "#5B47E0",
        taskCount: category.task_count_c || 0
      };
    } catch (error) {
      console.error("Error fetching category:", error.message);
      throw error;
    }
  }

  async create(categoryData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Name: categoryData.name,
          color_c: categoryData.color || "#5B47E0",
          task_count_c: 0
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
          console.error(`Failed to create categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create category');
        }

        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const category = successfulRecord.data;
          return {
            id: category.Id,
            name: category.Name,
            color: category.color_c || "#5B47E0",
            taskCount: category.task_count_c || 0
          };
        }
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      // Prepare updateable fields only
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.name !== undefined) {
        updateData.Name = updates.name;
      }
      if (updates.color !== undefined) {
        updateData.color_c = updates.color;
      }
      if (updates.taskCount !== undefined) {
        updateData.task_count_c = updates.taskCount;
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
          console.error(`Failed to update categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update category');
        }

        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const category = successfulRecord.data;
          return {
            id: category.Id,
            name: category.Name,
            color: category.color_c || "#5B47E0",
            taskCount: category.task_count_c || 0
          };
        }
      }
    } catch (error) {
      console.error("Error updating category:", error.message);
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
          console.error(`Failed to delete categories ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete category');
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting category:", error.message);
      throw error;
    }
  }
}
export default new CategoryService();