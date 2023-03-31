import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPut,
  requestBody,
  response,
} from "inversify-express-utils";

import {
  IUpdateCategoryRequestDTO,
  IUpdateCategoryResponseDTO,
} from "./update-category.dto";
import { UpdateCategoryUseCase } from "./update-category.usecase";

@controller("/category")
class UpdateCategoryController extends BaseController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {
    super("update-category-controller");
  }

  @httpPut("/")
  async execute(
    @requestBody() data: IUpdateCategoryRequestDTO,
    @response() res: any,
  ): Promise<IUpdateCategoryResponseDTO> {
    return this.callUseCaseAsync(
      this.updateCategoryUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { UpdateCategoryController };
