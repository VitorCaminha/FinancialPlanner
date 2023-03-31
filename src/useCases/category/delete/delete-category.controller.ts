import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpDelete, response } from "inversify-express-utils";
import { requestParam } from "inversify-express-utils/dts/decorators";

import {
  IDeleteCategoryRequestDTO,
  IDeleteCategoryResponseDTO,
} from "./delete-category.dto";
import { DeleteCategoryUseCase } from "./delete-category.usecase";

@controller("/category")
class DeleteCategoryController extends BaseController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {
    super("delete-category-controller");
  }

  @httpDelete("/:id")
  async execute(
    @requestParam() id: IDeleteCategoryRequestDTO,
    @response() res: any,
  ): Promise<IDeleteCategoryResponseDTO> {
    return this.callUseCaseAsync(
      this.deleteCategoryUseCase.execute(id),
      res,
      StatusCode.OK,
    );
  }
}

export { DeleteCategoryController };
