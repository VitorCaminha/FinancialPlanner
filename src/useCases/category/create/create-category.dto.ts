import { CategoryProps } from "@entities/category.entity";

interface ICreateCategoryRequestDTO {
  title: string;
}

interface ICreateCategoryResponseDTO extends CategoryProps {
  id: string;
}

export { ICreateCategoryRequestDTO, ICreateCategoryResponseDTO };
