import { provide } from "inversify-binding-decorators";

import {
  IBalance,
  ITransactionRepository,
} from "@repositories/transaction/transaction-repository.interface";
import { Transaction } from "@entities/transaction.entity";

@provide(InMemoryTransactionRepository)
class InMemoryTransactionRepository implements ITransactionRepository {
  private transactionsDB: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transactionsDB.push(transaction);
    return transaction;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const index: number = this.transactionsDB.findIndex(
      (item) => item.id === transaction.id,
    );

    if (index != -1) {
      this.transactionsDB.splice(index, 1, transaction);
    }

    return transaction;
  }

  async delete(id: string): Promise<void> {
    const index: number = this.transactionsDB.findIndex(
      (transaction) => transaction.id === id,
    );

    if (index != -1) {
      this.transactionsDB.splice(index, 1);
    }
  }

  async find(id: string): Promise<Transaction | null> {
    const user = this.transactionsDB.find(
      (transaction) => transaction.id === id,
    );
    return user || null;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsDB;
  }

  async findByCategoryId(categoryId: string): Promise<Transaction[]> {
    return this.transactionsDB.filter(
      (transaction) => transaction.category.id === categoryId,
    );
  }

  async getBalance(): Promise<IBalance> {
    const transactions = this.transactionsDB;

    const balance = transactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += Number(transaction.value);

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export { InMemoryTransactionRepository };
