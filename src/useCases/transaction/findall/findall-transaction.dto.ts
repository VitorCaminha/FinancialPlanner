import { TransactionProps } from "@entities/transaction.entity";

interface IFindAllTransactionResponseDTO extends TransactionProps {
  id: string;
  category: {
    id: string;
    title: string;
  };
}

export { IFindAllTransactionResponseDTO };
