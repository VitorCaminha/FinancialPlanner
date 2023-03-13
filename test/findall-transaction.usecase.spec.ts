import "reflect-metadata";

import { FindAllTransactionUseCase } from "@useCases/transaction/findall/findall-transaction.usecase";

import { InMemoryTransactionRepository } from "./repositories/inmemory-transaction-repository";

import { Transaction } from "@entities/transaction.entity";
import { Category } from "@entities/category.entity";

describe("FindAllTransactionUseCase", () => {
  let findAllTransactionUseCase: FindAllTransactionUseCase;

  const inMemoryTransactionRepository = new InMemoryTransactionRepository();

  beforeEach(() => {
    findAllTransactionUseCase = new FindAllTransactionUseCase(
      inMemoryTransactionRepository,
    );
  });

  it("should be able to find all transactions", async () => {
    const transaction = await inMemoryTransactionRepository.create(
      new Transaction(
        {
          title: "transaction-test",
          type: "income",
          value: 10,
        },
        new Category({ title: "transaction-category-test" }),
      ),
    );

    await inMemoryTransactionRepository.create(
      new Transaction(
        {
          title: "transaction-test",
          type: "income",
          value: 10,
        },
        new Category({ title: "transaction-category-test" }),
      ),
    );

    const transactions = await findAllTransactionUseCase.execute();

    expect(transactions).toHaveLength(2);
    expect(transactions[0].id).toBe(transaction.id);
  });
});
