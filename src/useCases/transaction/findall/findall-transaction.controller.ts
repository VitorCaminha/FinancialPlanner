import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";

import { IFindAllTransactionResponseDTO } from "./findall-transaction.dto";
import { FindAllTransactionUseCase } from "./findall-transaction.usecase";

@controller("/transaction")
class FindAllTransactionController extends BaseController {
  constructor(private findAllTransactionUseCase: FindAllTransactionUseCase) {
    super("find-all-transaction-controller");
  }

  @httpGet("/")
  async execute(@response() res: any): Promise<IFindAllTransactionResponseDTO> {
    return this.callUseCaseAsync(
      this.findAllTransactionUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { FindAllTransactionController };
