import { CreateModule } from "@expressots/core";

import { CreateCategoryController } from "./create/create-category.controller";
import { FindAllCategoryController } from "./findall/findall-category.controller";

const CategoryModule = CreateModule([
  CreateCategoryController,
  FindAllCategoryController,
]);

export { CategoryModule };
