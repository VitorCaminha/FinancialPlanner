import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from "./create-category.dto";
import { CreateCategoryUseCase } from "./create-category.usecase";

@controller("/category")
class CreateCategoryController extends BaseController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    super("create-category-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() data: ICreateCategoryRequestDTO,
    @response() res: any,
  ): Promise<ICreateCategoryResponseDTO> {
    return this.callUseCaseAsync(
      this.createCategoryUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { CreateCategoryController };
