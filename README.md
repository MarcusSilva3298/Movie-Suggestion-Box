# NestJS Setup

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with code examples.

Code here follows the basic NestJS containing the follow:
- Prisma
- PostgresSQL with Docker
- GitHub push comments with Husky
- Unit and E2E tests with Jest

This Setup also contains branches with a few examples of code, these are just suggestions/examples of how i personally create my projects and you can implement in your own code:
- [Basic Clean Code NestJS organization](https://github.com/MarcusSilva3298/NestJS-Setup/tree/code_example)
  - Flat organization
  - Factory + Query services
  - Independent Repository from Services

## Installation

```bash
$ yarn install
```

## Running the app

```bas
# development mode
$ yarn start:dev

# build
$ yarn build

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# Change the file path in command in the package.json to change the file tested
# run one unit test
$ yarn test:one

# run one e2e test
$ yarn test:one:e2e
```

## Stay in touch

- Code Author - [Marcus Silva](https://github.com/MarcusSilva3298)

