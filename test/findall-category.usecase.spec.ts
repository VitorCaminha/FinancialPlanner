import "reflect-metadata";

import { FindAllCategoryUseCase } from "@useCases/category/findall/findall-category.usecase";

import { InMemoryCategoryRepository } from "./repositories/inmemory-category-repository";

import { Category } from "@entities/category.entity";

describe("FindAllCategoryUseCase", () => {
  let findAllCategoryUseCase: FindAllCategoryUseCase;

  const inMemoryCategoryRepository = new InMemoryCategoryRepository();

  beforeEach(() => {
    findAllCategoryUseCase = new FindAllCategoryUseCase(
      inMemoryCategoryRepository,
    );
  });

  it("should be able to find all categories", async () => {
    const category = await inMemoryCategoryRepository.create(
      new Category({ title: "category-test" }),
    );

    await inMemoryCategoryRepository.create(
      new Category({ title: "category-test-2" }),
    );

    const categories = await findAllCategoryUseCase.execute();

    expect(categories).toHaveLength(2);
    expect(categories[0].id).toBe(category.id);
  });
});
