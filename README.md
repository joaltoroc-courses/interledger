<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## 🎯 Project Objective

The main goal of this project is to provide a robust and scalable solution for managing financial transactions between different entities. This is achieved by leveraging the **Interledger protocol** and the **Open Payments** standard, which allows for secure and efficient payments across different payment networks.

This project provides a REST API that allows you to:

- Get information about a wallet address.
- Create a payment request.
- Confirm a payment.

## 💻 Technology Stack

This project is built using a modern and powerful technology stack that ensures high performance, scalability, and maintainability. The key technologies used include:

- **Programming Language**: `TypeScript`
- **Framework**: `NestJS`
- **HTTP Server**: `Fastify`
- **API Documentation**: `Swagger`
- **Linting**: `ESLint`
- **Code Formatting**: `Prettier`
- **Testing**: `Jest`

## 📖 API Documentation with Swagger

This project uses Swagger to provide comprehensive and interactive API documentation. Swagger allows you to visualize and interact with the API's resources without having any of the implementation logic in place.

To access the Swagger documentation, simply run the application and navigate to `http://localhost:3000/api/docs`. The Swagger UI will be automatically generated, providing a clear and detailed overview of all available endpoints, their parameters, and response objects.

## 🔗 Interledger Integration

This project integrates with the Interledger network using the `@interledger/open-payments` library. This library provides a set of tools for interacting with the Open Payments API, which is a standard for sending and receiving payments over the Interledger protocol.

The application uses an authenticated client to communicate with the Open Payments API. This client is configured in the `payments.module.ts` file and uses the following environment variables:

- `IL_BASE`: The base URL of the Interledger service provider.
- `IL_WALLET`: The wallet address of the user.
- `IL_KEY_ID`: The key ID for authenticating with the Open Payments API.
- `IL_PRIVATE_KEY`: The private key for authenticating with the Open Payments API.

## 🏗️ Application Architecture

This project follows the standard NestJS architecture, with a clear separation of concerns between modules, controllers, and services.

- **DTOs**: The application uses Data Transfer Objects (DTOs) for validating the data sent to the API. The DTOs are defined in the `src/payments/dto` directory and are used in the `payments.controller.ts` file.
- **Error Handling**: The application uses a global filter for handling HTTP exceptions. The filter is defined in the `src/common/filter/http-exception.filter.ts` file and is applied to all incoming requests.
- **Interceptors**: The application uses a global interceptor for handling timeouts. The interceptor is defined in the `src/common/interceptors/timeout.interceptor.ts` file and is applied to all incoming requests.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).