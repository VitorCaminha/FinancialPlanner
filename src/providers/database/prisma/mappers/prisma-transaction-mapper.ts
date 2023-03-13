import {
  Category as PrismaCategory,
  Transaction as PrismaTransaction,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { Transaction } from "@entities/transaction.entity";
import { Category } from "@entities/category.entity";

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction): PrismaTransaction {
    return {
      id: transaction.id,
      title: transaction.title,
      type: transaction.type,
      value: new Decimal(transaction.value),
      categoryId: transaction.category.id,
      createdAt: transaction.createdAt,
    };
  }

  static toDomain(
    transaction: PrismaTransaction & { category: PrismaCategory },
  ): Transaction {
    return new Transaction(
      {
        title: transaction.title,
        type: transaction.type as "income" | "outcome",
        value: Number(transaction.value),
        createdAt: transaction.createdAt,
      },
      new Category(transaction.category, transaction.category.id),
      transaction.id,
    );
  }
}
