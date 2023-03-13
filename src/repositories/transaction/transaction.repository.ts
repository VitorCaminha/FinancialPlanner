import { provide } from "inversify-binding-decorators";

import { PrismaTransactionRepository } from "@providers/database/prisma/repositories/prisma-transaction-repository";
import { ITransactionRepository } from "./transaction-repository.interface";

@provide(TransactionRepository)
class TransactionRepository
  extends PrismaTransactionRepository
  implements ITransactionRepository {}

export { TransactionRepository };
