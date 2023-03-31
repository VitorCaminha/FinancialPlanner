import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { AppError, Report, StatusCode } from "@expressots/core";

import {
  IUpdateCategoryRequestDTO,
  IUpdateCategoryResponseDTO,
} from "./update-category.dto";

import { CategoryRepository } from "@repositories/category/category-repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";

@provide(UpdateCategoryUseCase)
class UpdateCategoryUseCase {
  constructor(
    @inject(CategoryRepository) private categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: IUpdateCategoryRequestDTO,
  ): Promise<IUpdateCategoryResponseDTO> {
    try {
      const category = await this.categoryRepository.find(data.id);

      if (!category) {
        throw Report.Error(
          new AppError(
            StatusCode.NotFound,
            "Category not found.",
            "update-category-usecase",
          ),
        );
      }

      category.title = data.title;

      return this.categoryRepository.update(category);
    } catch (error: any) {
      throw error;
    }
  }
}

export { UpdateCategoryUseCase };
