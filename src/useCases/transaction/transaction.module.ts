import { CreateModule } from "@expressots/core";

import { CreateTransactionController } from "./create/create-transaction.controller";
import { FindAllTransactionController } from "./findall/findall-transaction.controller";
import { FindByCategoryTransactionController } from "./findbycategory/findbycategory-transaction.controller";

const TransactionModule = CreateModule([
  CreateTransactionController,
  FindAllTransactionController,
  FindByCategoryTransactionController,
]);

export { TransactionModule };
