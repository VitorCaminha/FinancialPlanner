import { CreateModule } from "@expressots/core";

import { CreateCategoryController } from "./create/create-category.controller";
import { DeleteCategoryController } from "./delete/delete-category.controller";
import { FindAllCategoryController } from "./findall/findall-category.controller";
import { UpdateCategoryController } from "./update/update-category.controller";

const CategoryModule = CreateModule([
  CreateCategoryController,
  FindAllCategoryController,
  UpdateCategoryController,
  DeleteCategoryController,
]);

export { CategoryModule };
