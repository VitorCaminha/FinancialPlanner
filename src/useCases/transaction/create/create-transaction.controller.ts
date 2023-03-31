import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  ICreateTransactionDTO,
  ICreateTransactionResponseDTO,
} from "./create-transaction.dto";
import { CreateTransactionUseCase } from "./create-transaction.usecase";

@controller("/transaction")
class CreateTransactionController extends BaseController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {
    super("create-transaction-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() data: ICreateTransactionDTO,
    @response() res: any,
  ): Promise<ICreateTransactionResponseDTO> {
    return this.callUseCaseAsync(
      this.createTransactionUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { CreateTransactionController };
