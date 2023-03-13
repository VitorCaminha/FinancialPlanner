import "reflect-metadata";
import { AppError } from "@expressots/core";

import { FindByCategoryTransactionUseCase } from "@useCases/transaction/findbycategory/findbycategory-transaction.usecase";

import { InMemoryTransactionRepository } from "./repositories/inmemory-transaction-repository";
import { InMemoryCategoryRepository } from "./repositories/inmemory-category-repository";

import { Transaction } from "@entities/transaction.entity";
import { Category } from "@entities/category.entity";

describe("FindByCategoryTransactionUseCase", () => {
  let findByCategoryTransactionUseCase: FindByCategoryTransactionUseCase;

  const inMemoryTransactionRepository = new InMemoryTransactionRepository();
  const inMemoryCategoryRepository = new InMemoryCategoryRepository();

  beforeEach(() => {
    findByCategoryTransactionUseCase = new FindByCategoryTransactionUseCase(
      inMemoryTransactionRepository,
      inMemoryCategoryRepository,
    );
  });

  it("should be able to find transactions by category", async () => {
    const category = await inMemoryCategoryRepository.create(
      new Category({ title: "category-test" }),
    );

    await inMemoryTransactionRepository.create(
      new Transaction(
        {
          title: "transaction-test",
          type: "income",
          value: 10,
        },
        category,
      ),
    );

    await inMemoryTransactionRepository.create(
      new Transaction(
        {
          title: "transaction-test-2",
          type: "income",
          value: 10,
        },
        category,
      ),
    );

    await inMemoryTransactionRepository.create(
      new Transaction(
        {
          title: "transaction-test-3",
          type: "income",
          value: 10,
        },
        new Category({ title: "transaction-category-test" }),
      ),
    );

    const transactions = await findByCategoryTransactionUseCase.execute(
      category.id,
    );

    expect(transactions).toHaveLength(2);
  });

  it("should not be able to find transactions when category id passed does not exists", async () => {
    await expect(
      findByCategoryTransactionUseCase.execute("non-existent-category-id"),
    ).rejects.toBeInstanceOf(AppError);
  });
});
