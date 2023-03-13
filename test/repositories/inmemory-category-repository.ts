import { provide } from "inversify-binding-decorators";

import { ICategoryRepository } from "@repositories/category/category-repository.interface";
import { Category } from "@entities/category.entity";

@provide(InMemoryCategoryRepository)
class InMemoryCategoryRepository implements ICategoryRepository {
  private categoriesDB: Category[] = [];

  async create(category: Category): Promise<Category> {
    this.categoriesDB.push(category);
    return category;
  }

  async update(category: Category): Promise<Category> {
    const index: number = this.categoriesDB.findIndex(
      (item) => item.id === category.id,
    );

    if (index != -1) {
      this.categoriesDB.splice(index, 1, category);
    }

    return category;
  }

  async delete(id: string): Promise<void> {
    const index: number = this.categoriesDB.findIndex(
      (category) => category.id === id,
    );

    if (index != -1) {
      this.categoriesDB.splice(index, 1);
    }
  }

  async find(id: string): Promise<Category | null> {
    const user = this.categoriesDB.find((category) => category.id === id);
    return user || null;
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesDB;
  }
}

export { InMemoryCategoryRepository };
