import { PrismaClient } from "@prisma/client";
import { fluentProvide } from "inversify-binding-decorators";

const provideSingleton = (identifier: any) => {
  return fluentProvide(identifier).inSingletonScope().done();
};

@provideSingleton(PrismaProvider)
export class PrismaProvider {
  readonly client: PrismaClient = new PrismaClient();

  public async connect() {
    await this.client.$connect();
  }

  public async shutdown() {
    await this.client.$disconnect();
  }
}
