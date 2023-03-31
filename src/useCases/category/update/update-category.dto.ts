import { CategoryProps } from "@entities/category.entity";

interface IUpdateCategoryRequestDTO {
  id: string;
  title: string;
}

interface IUpdateCategoryResponseDTO extends CategoryProps {
  id: string;
}

export { IUpdateCategoryRequestDTO, IUpdateCategoryResponseDTO };
