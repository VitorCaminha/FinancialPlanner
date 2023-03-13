import { Category } from "@entities/category.entity";

interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}

export { ICategoryRepository };
