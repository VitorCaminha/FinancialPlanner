import "reflect-metadata";
import { AppError } from "@expressots/core";

import { CreateTransactionUseCase } from "@useCases/transaction/create/create-transaction.usecase";

import { InMemoryTransactionRepository } from "./repositories/inmemory-transaction-repository";
import { InMemoryCategoryRepository } from "./repositories/inmemory-category-repository";

import { Category } from "@entities/category.entity";

describe("CreateTransactionUseCase", () => {
  let createTransactionUseCase: CreateTransactionUseCase;

  const inMemoryTransactionRepository = new InMemoryTransactionRepository();
  const inMemoryCategoryRepository = new InMemoryCategoryRepository();

  beforeEach(() => {
    createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryTransactionRepository,
      inMemoryCategoryRepository,
    );
  });

  it("should be able to create a transaction", async () => {
    const category = await inMemoryCategoryRepository.create(
      new Category({ title: "transaction-category-test" }),
    );

    const transaction = await createTransactionUseCase.execute({
      title: "transaction-test",
      type: "income",
      value: 10,
      categoryId: category.id,
    });

    expect(transaction?.id).toBeTruthy();
    expect(transaction?.title).toBe("transaction-test");
    expect(transaction?.type).toBe("income");
    expect(transaction?.value).toBe(10);
    expect(transaction?.category.id).toBe(category.id);
    expect(transaction?.category.title).toBe("transaction-category-test");
  });

  it("should not be able to create a transaction with nonexistent category id", async () => {
    await expect(
      createTransactionUseCase.execute({
        title: "transaction-test",
        type: "income",
        value: 10,
        categoryId: "nonexistent-category-id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a transaction with invalid type", async () => {
    const category = await inMemoryCategoryRepository.create(
      new Category({ title: "transaction-category-test" }),
    );

    await expect(
      createTransactionUseCase.execute({
        title: "transaction-test",
        type: "invalid-type" as "income",
        value: 10,
        categoryId: category.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
