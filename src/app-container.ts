import { AppContainer } from "@expressots/core/";

import { PingModule } from "@useCases/ping/ping.module";
import { CategoryModule } from "@useCases/category/category.module";
import { TransactionModule } from "@useCases/transaction/transaction.module";

const appContainer = new AppContainer();

const container = appContainer.create([
  PingModule,
  CategoryModule,
  TransactionModule,
]);

export { container };
