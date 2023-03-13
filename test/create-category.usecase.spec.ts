import "reflect-metadata";

import { CreateCategoryUseCase } from "@useCases/category/create/create-category.usecase";

import { InMemoryCategoryRepository } from "./repositories/inmemory-category-repository";

describe("CreateCategoryUseCase", () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    createCategoryUseCase = new CreateCategoryUseCase(
      new InMemoryCategoryRepository(),
    );
  });

  it("should be able to create a category", async () => {
    const category = await createCategoryUseCase.execute({
      title: "category-test",
    });

    expect(category?.id).toBeTruthy();
    expect(category?.title).toBe("category-test");
  });
});
