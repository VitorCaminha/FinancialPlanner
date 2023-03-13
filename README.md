<p align="center">
  <a href="https://expresso-ts.com/" target="blank"><img src="https://github.com/expressots/expressots/blob/main/media/alogo.png" width="120" alt="Expresso TS Logo" /></a>
</p>

# Expresso TS

A Typescript + [Node.js]("https://nodejs.org/en/") lightweight framework for quick building scalable, easy to read and maintain, server-side applications 🚀

## Philosophy

Expresso TS is a framework designed to make the lives of the developers easier by providing a structure for building server-side applications that is clear to read, maintain and scale. The philosophy is centered around the idea that developers should not have to waste time on repetitive tasks such as setting up a logging system, authentication, error handling, database connection, and organizing the project for better maintainability.

Expresso TS offers a solution that is designed to help developers jump ahead and focus on the most important part of the development process, writing code. The framework provides capability to the developers to quickly extend the framework functionalities by creating providers and adding them to the dependency injection system. This way, developers can use these new functionalities throughout the entire application without having to worry about the complexities of integrating it into the system.

## Installation

```bash
npm run install
```

## Running the app

```bash
# development
npm run start

# build
npm run build

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

## Support

Expresso TS is an MIT-Licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you want to join the them, as we are currently looking for sponsors and backers, please [contact us](mailto: br.developer@gmail.com)

## Stay in touch

Author - [Richard Zampieri](https://github.com/rsaz)

## License

Expresso TS [MIT LICENSE](https://github.com/expressots/expressots/blob/main/LICENSE.md).

## Suggestions / Changes

- Add port and enviroment from env variables
- **npm audit report**
```
  qs  6.5.0 - 6.5.2
  Severity: high
  qs vulnerable to Prototype Pollution - https://github.com/advisories/GHSA-hrpp-h998-j3pp
  fix available via npm audit fix
  node_modules/inversify-express-utils/node_modules/qs
    body-parser  1.18.0 - 1.18.3
    Depends on vulnerable versions of qs
    node_modules/inversify-express-utils/node_modules/body-parser
      express  4.15.4 - 4.16.4 || 5.0.0-alpha.1 - 5.0.0-alpha.7
      Depends on vulnerable versions of body-parser
      Depends on vulnerable versions of qs
      node_modules/inversify-express-utils/node_modules/express
        inversify-express-utils  4.1.0 - 6.3.2
        Depends on vulnerable versions of express
        node_modules/inversify-express-utils

  4 high severity vulnerabilities
```
- Service name not logging if not defined without Report.Error
- Service name needing to be called in each controller constructor can cause some incorrect information in the log if the user forgets to call it correctly. Perhaps it should be set automatically based on the class name.
- Default status code in app error?
- Tirar a lib de uuid e usar a do próprio node:crypto? Se continuar na lib, npm i --save-dev @types/uuid
- Should use tsx + tsup instead of tsnd and tsc?
- Fix opinionated template (findall DTO without User in name and other details)
- callUseCaseAsync not working
- In memory repository not working out of the box
- Better way to separate in memory repositories and providers repositories?
- Fix update method in base repository
- Not registering prisma provider as singleton, causing too many instances