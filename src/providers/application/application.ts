import { Application, Environments, LogLevel, log } from "@expressots/core";
import { provide } from "inversify-binding-decorators";

import { PrismaProvider } from "@providers/database/prisma";

@provide(App)
class App extends Application {
  private databaseProvider = new PrismaProvider();

  protected configureServices(): void {
    Environments.checkAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected postServerInitialization(): void {
    this.databaseProvider.connect();
  }

  protected serverShutdown(): void {
    log(LogLevel.Info, "Server is shutting down", "logger-provider");
    this.databaseProvider.shutdown();
    super.serverShutdown();
  }
}

const appInstance = new App();

export { appInstance as App };
