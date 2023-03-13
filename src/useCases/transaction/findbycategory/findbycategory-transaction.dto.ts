import { TransactionProps } from "@entities/transaction.entity";

interface IFindByCategoryTransactionResponseDTO extends TransactionProps {
  id: string;
}

export { IFindByCategoryTransactionResponseDTO };
