import { provide } from "inversify-binding-decorators";

import { PrismaCategoryRepository } from "@providers/database/prisma/repositories/prisma-category-repository";
import { ICategoryRepository } from "./category-repository.interface";

@provide(CategoryRepository)
class CategoryRepository
  extends PrismaCategoryRepository
  implements ICategoryRepository {}

export { CategoryRepository };
