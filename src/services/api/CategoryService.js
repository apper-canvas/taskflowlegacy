import mockCategories from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...mockCategories];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.categories];
  }

  async getById(id) {
    await this.delay();
    const category = this.categories.find(cat => cat.id === parseInt(id));
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return { ...category };
  }

  async create(categoryData) {
    await this.delay();
    
    const newCategory = {
      id: Math.max(...this.categories.map(c => c.id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || "#5B47E0",
      taskCount: 0
    };

    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await this.delay();
    
    const index = this.categories.findIndex(cat => cat.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }

    this.categories[index] = {
      ...this.categories[index],
      ...updates
    };

    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay();
    
    const index = this.categories.findIndex(cat => cat.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }

    this.categories.splice(index, 1);
    return true;
  }

  async updateTaskCount(categoryName, increment = 1) {
    await this.delay();
    
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.taskCount = Math.max(0, category.taskCount + increment);
      return { ...category };
    }
    
    return null;
  }
}

export default new CategoryService();