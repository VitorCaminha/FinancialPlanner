import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

import { Category } from "@entities/category.entity";

import { ICategoryRepository } from "@repositories/category/category-repository.interface";

import { PrismaProvider } from "..";
import { PrismaCategoryMapper } from "../mappers/prisma-category-mapper";

@provide(PrismaCategoryRepository)
class PrismaCategoryRepository implements ICategoryRepository {
  constructor(@inject(PrismaProvider) private prisma: PrismaProvider) {}

  async create(category: Category): Promise<Category> {
    const newCategory = await this.prisma.client.category.create({
      data: PrismaCategoryMapper.toPrisma(category),
    });

    return PrismaCategoryMapper.toDomain(newCategory);
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = await this.prisma.client.category.update({
      where: { id: category.id },
      data: PrismaCategoryMapper.toPrisma(category),
    });

    return PrismaCategoryMapper.toDomain(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.category.delete({ where: { id } });
  }

  async find(id: string): Promise<Category | null> {
    const category = await this.prisma.client.category.findUnique({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.client.category.findMany();

    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }
}

export { PrismaCategoryRepository };
