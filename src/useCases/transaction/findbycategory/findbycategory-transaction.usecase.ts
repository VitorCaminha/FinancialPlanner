import { AppError, Report, StatusCode } from "@expressots/core";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { Transaction } from "@entities/transaction.entity";
import { IFindByCategoryTransactionResponseDTO } from "./findbycategory-transaction.dto";

import { ITransactionRepository } from "@repositories/transaction/transaction-repository.interface";
import { TransactionRepository } from "@repositories/transaction/transaction.repository";
import { ICategoryRepository } from "@repositories/category/category-repository.interface";
import { CategoryRepository } from "@repositories/category/category-repository";

@provide(FindByCategoryTransactionUseCase)
class FindByCategoryTransactionUseCase {
  constructor(
    @inject(TransactionRepository)
    private transactionRepository: ITransactionRepository,
    @inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    categoryId: string,
  ): Promise<IFindByCategoryTransactionResponseDTO[] | null> {
    try {
      const categoryExists = await this.categoryRepository.find(categoryId);

      if (!categoryExists) {
        throw Report.Error(
          new AppError(
            StatusCode.NotFound,
            "Category with this id not found.",
            "find-by-category-transaction-usecase",
          ),
        );
      }

      const transactions = await this.transactionRepository.findByCategoryId(
        categoryId,
      );

      return transactions.map((transaction: Transaction) => ({
        id: transaction.id,
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        createdAt: transaction.createdAt,
      }));
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindByCategoryTransactionUseCase };
