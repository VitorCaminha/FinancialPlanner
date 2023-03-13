import { Category as PrismaCategory } from "@prisma/client";

import { Category } from "@entities/category.entity";

export class PrismaCategoryMapper {
  static toPrisma(category: Category): PrismaCategory {
    return {
      id: category.id,
      title: category.title,
      createdAt: category.createdAt,
    };
  }

  static toDomain(category: PrismaCategory): Category {
    return new Category(
      {
        title: category.title,
        createdAt: category.createdAt,
      },
      category.id,
    );
  }
}
