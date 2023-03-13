import { AppError, Report, StatusCode } from "@expressots/core";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { Transaction } from "@entities/transaction.entity";
import {
  ICreateTransactionDTO,
  ICreateTransactionResponseDTO,
} from "./create-transaction.dto";

import { ITransactionRepository } from "@repositories/transaction/transaction-repository.interface";
import { TransactionRepository } from "@repositories/transaction/transaction.repository";
import { CategoryRepository } from "@repositories/category/category-repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";

@provide(CreateTransactionUseCase)
class CreateTransactionUseCase {
  constructor(
    @inject(TransactionRepository)
    private transactionRepository: ITransactionRepository,
    @inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    data: ICreateTransactionDTO,
  ): Promise<ICreateTransactionResponseDTO | null> {
    if (!["income", "outcome"].includes(data.type)) {
      throw Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Invalid Transaction Type. Choose between income and outcome.",
          "create-transaction-usecase",
        ),
      );
    }

    const transactionCategory = await this.categoryRepository.find(
      data.categoryId,
    );

    if (!transactionCategory) {
      throw Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Invalid category id.",
          "create-transaction-usecase",
        ),
      );
    }

    try {
      const transaction = await this.transactionRepository.create(
        new Transaction(data, transactionCategory),
      );

      const { id, title, type, value, createdAt, category } = transaction;

      return {
        id,
        title,
        type,
        value,
        createdAt,
        category: {
          id: category.id,
          title: category.title,
          createdAt: category.createdAt,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
}

export { CreateTransactionUseCase };
