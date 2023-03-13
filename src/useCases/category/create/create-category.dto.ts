import { CategoryProps } from "@entities/category.entity";

interface ICreateCategoryDTO {
  title: string;
}

interface ICreateCategoryResponseDTO extends CategoryProps {
  id: string;
}

export { ICreateCategoryDTO, ICreateCategoryResponseDTO };
