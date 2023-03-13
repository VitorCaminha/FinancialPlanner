import { provide } from "inversify-binding-decorators";
import { v4 as uuidv4 } from "uuid";

import { Replace } from "helpers/Replace";

interface CategoryProps {
  title: string;
  createdAt: Date;
}

@provide(Category)
class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? uuidv4();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Category, CategoryProps };
