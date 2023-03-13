import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { Transaction } from "@entities/transaction.entity";
import { IFindAllTransactionResponseDTO } from "./findall-transaction.dto";

import { ITransactionRepository } from "@repositories/transaction/transaction-repository.interface";
import { TransactionRepository } from "@repositories/transaction/transaction.repository";

@provide(FindAllTransactionUseCase)
class FindAllTransactionUseCase {
  constructor(
    @inject(TransactionRepository)
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(): Promise<IFindAllTransactionResponseDTO[]> {
    try {
      const transactions = await this.transactionRepository.findAll();

      return transactions.map((transaction: Transaction) => ({
        id: transaction.id,
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        createdAt: transaction.createdAt,
        category: {
          id: transaction.category.id,
          title: transaction.category.title,
        },
      }));
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindAllTransactionUseCase };
