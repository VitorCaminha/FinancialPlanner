import { Transaction } from "@entities/transaction.entity";

interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  findByCategoryId(categoryId: string): Promise<Transaction[]>;
  getBalance(): Promise<IBalance>;
}

export { ITransactionRepository, IBalance };
