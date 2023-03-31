import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import {
  IDeleteCategoryRequestDTO,
  IDeleteCategoryResponseDTO,
} from "./delete-category.dto";

import { CategoryRepository } from "@repositories/category/category-repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";

@provide(DeleteCategoryUseCase)
class DeleteCategoryUseCase {
  constructor(
    @inject(CategoryRepository) private categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: IDeleteCategoryRequestDTO,
  ): Promise<IDeleteCategoryResponseDTO> {
    try {
      await this.categoryRepository.delete(data.id);

      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export { DeleteCategoryUseCase };
