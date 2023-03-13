import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { v4 as uuidv4 } from "uuid";

import { Replace } from "helpers/Replace";

import { Category } from "./category.entity";

interface TransactionProps {
  title: string;
  type: "income" | "outcome";
  value: number;
  createdAt: Date;
}

@provide(Transaction)
class Transaction {
  private _id: string;
  private props: TransactionProps;

  constructor(
    props: Replace<TransactionProps, { createdAt?: Date }>,
    @inject(Category) private _category: Category,
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

  public get type(): "income" | "outcome" {
    return this.props.type;
  }

  public set type(type: "income" | "outcome") {
    this.props.type = type;
  }

  public get value(): number {
    return this.props.value;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get category(): Category {
    return this._category;
  }

  public set category(category: Category) {
    this._category = category;
  }
}

export { Transaction, TransactionProps };
