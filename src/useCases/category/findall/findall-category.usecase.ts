import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { IFindAllCategoryResponseDTO } from "./findall-category.dto";

import { CategoryRepository } from "@repositories/category/category-repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";

@provide(FindAllCategoryUseCase)
class FindAllCategoryUseCase {
  constructor(
    @inject(CategoryRepository) private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<IFindAllCategoryResponseDTO[]> {
    try {
      const categories = await this.categoryRepository.findAll();

      return categories.map((category) => ({
        id: category.id,
        title: category.title,
        createdAt: category.createdAt,
      }));
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindAllCategoryUseCase };
