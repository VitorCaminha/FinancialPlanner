import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  response,
  requestParam,
} from "inversify-express-utils";

import { IFindByCategoryTransactionResponseDTO } from "./findbycategory-transaction.dto";
import { FindByCategoryTransactionUseCase } from "./findbycategory-transaction.usecase";

@controller("/transaction/category")
class FindByCategoryTransactionController extends BaseController {
  constructor(
    private findByCategoryTransactionUseCase: FindByCategoryTransactionUseCase,
  ) {
    super("find-by-category-transaction-controller");
  }

  @httpGet("/:categoryId")
  async execute(
    @requestParam("categoryId") categoryId: string,
    @response() res: any,
  ): Promise<IFindByCategoryTransactionResponseDTO> {
    return this.callUseCaseAsync(
      this.findByCategoryTransactionUseCase.execute(categoryId),
      res,
      StatusCode.OK,
    );
  }
}

export { FindByCategoryTransactionController };
