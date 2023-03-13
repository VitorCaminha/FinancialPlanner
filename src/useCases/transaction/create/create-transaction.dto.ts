import { CategoryProps } from "@entities/category.entity";
import { TransactionProps } from "@entities/transaction.entity";

interface ICreateTransactionDTO {
  title: string;
  type: "income" | "outcome";
  value: number;
  categoryId: string;
}

interface ICreateTransactionResponseDTO extends TransactionProps {
  id: string;
  category: { id: string } & CategoryProps;
}

export { ICreateTransactionDTO, ICreateTransactionResponseDTO };
