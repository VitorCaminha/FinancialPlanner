import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

import { Transaction } from "@entities/transaction.entity";

import {
  IBalance,
  ITransactionRepository,
} from "@repositories/transaction/transaction-repository.interface";

import { PrismaProvider } from "..";
import { PrismaTransactionMapper } from "../mappers/prisma-transaction-mapper";

@provide(PrismaTransactionRepository)
class PrismaTransactionRepository implements ITransactionRepository {
  constructor(@inject(PrismaProvider) private prisma: PrismaProvider) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.prisma.client.transaction.create({
      data: PrismaTransactionMapper.toPrisma(transaction),
      include: { category: true },
    });

    return PrismaTransactionMapper.toDomain(newTransaction);
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const updatedTransaction = await this.prisma.client.transaction.update({
      where: { id: transaction.id },
      data: PrismaTransactionMapper.toPrisma(transaction),
      include: { category: true },
    });

    return PrismaTransactionMapper.toDomain(updatedTransaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.transaction.delete({ where: { id } });
  }

  async find(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.client.transaction.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!transaction) {
      return null;
    }

    return PrismaTransactionMapper.toDomain(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.client.transaction.findMany({
      include: { category: true },
    });

    return transactions.map((transaction) =>
      PrismaTransactionMapper.toDomain(transaction),
    );
  }

  async findByCategoryId(categoryId: string): Promise<Transaction[]> {
    const transaction = await this.prisma.client.transaction.findMany({
      where: { categoryId },
      include: { category: true },
    });

    return transaction.map((transaction) =>
      PrismaTransactionMapper.toDomain(transaction),
    );
  }

  async getBalance(): Promise<IBalance> {
    const transactions = await this.prisma.client.transaction.findMany();

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

export { PrismaTransactionRepository };
