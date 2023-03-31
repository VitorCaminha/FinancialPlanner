import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { Category } from "@entities/category.entity";
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from "./create-category.dto";

import { CategoryRepository } from "@repositories/category/category-repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";

@provide(CreateCategoryUseCase)
class CreateCategoryUseCase {
  constructor(
    @inject(CategoryRepository) private categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: ICreateCategoryRequestDTO,
  ): Promise<ICreateCategoryResponseDTO> {
    try {
      const category = new Category(data);

      const dbCategory = await this.categoryRepository.create(category);

      return {
        id: dbCategory.id,
        title: dbCategory.title,
        createdAt: dbCategory.createdAt,
      };
    } catch (error: any) {
      throw error;
    }
  }
}

export { CreateCategoryUseCase };
