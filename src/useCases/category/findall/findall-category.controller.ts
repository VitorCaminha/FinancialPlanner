import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { IFindAllCategoryResponseDTO } from "./findall-category.dto";
import { FindAllCategoryUseCase } from "./findall-category.usecase";

@controller("/category")
class FindAllCategoryController extends BaseController {
  constructor(private findAllCategoryUseCase: FindAllCategoryUseCase) {
    super("find-all-category-controller");
  }

  @httpGet("/")
  async execute(@response() res: any): Promise<IFindAllCategoryResponseDTO> {
    return this.callUseCaseAsync(
      this.findAllCategoryUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { FindAllCategoryController };
