---
title: The power of turborepo
description: Turborepo can be an incredibly useful tool when you need to manage multiple projects in a single repository. This article walks through my experience of when I needed a monorepo solution and the benefits it provided.
createdAt: April, 2023
index: 0
---

## The Problem

The project was made up of two Next.js applications - one containing the admin dashboard and the other for the public facing site. Both apps would then interact with one another through a shared API, using Prisma with a PostgreSQL database.

When working on the project, two key issues became apparent:

1. The same database instance and schema would be unable to be shared between both apps, because - as far as the repo was concerned - they were completely stand alone apps, despite being stored in the same repo.
2. The CI pipeline became overly complex as it required both apps to be built and tested separately.

## The Solution

Upon realising the problem, it was evident that a 'true' monorepo solution was needed to continue development in the most efficient manner. Given that the apps had already been setup with Next.js, Turborepo was the obvious choice.

Turborepo is a tool that allows you to manage multiple projects in a single repository, while still allowing you to treat each project as a stand alone app. This solved the project's initial problems immediately, out of the box, at the same time allowing for additional benefits, such as the ability to:

1. Set up shared UI components and config settings between both apps.
2. Centrally manage dependencies and environment variables between both apps.
3. Easily launch both apps locally with a single command for development.

Turborepo also allows for quick deployment on Vercel, making the migration even easier. Both apps could be deployed to Vercel like any other Next.js app. All that was required was to connect the repo to Vercel and then select the app to deploy from the app directory. The same repo could then be connected again to start a new Vercel project, repeating the process for each app in the monorepo.

## Key aspects of Turborepo

The key aspects of a Turborepo project are:

- Root directory:
  - This is where the `turbo.json` file is stored along with the root `package.json` file.
  - The `turbo.json` file is where global dependencies (such as .env files) are stored, along with the pipeline. The pipeline specifies the commands to run for each app, as well as other scripts, such as building, testing, generating the database schema and linting.
- Apps directory:
  - This is where each app is stored. While each app has access to the root directory, each app within the Apps directory can be treated as it's own stand alone app.
- Packages directory:
  - This is where shared packages and configs can be stored. For example, this is where you can store a project wide `tsconfig` file, `eslint` config, or a database config. As the project uses Prisma, this is where the database schema and prisma client are defined. This allows for the prisma schema and client to be shared across both apps, using the recommended singleton pattern for the PrismaClient instantiation.
  - Shared UI libraries can also be stored here to share components between apps. In order to use a shared component in an app, it must have the shared package as a local dependency in the `package.json`.

## Code Examples

### Example `turbo.json` file

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build", "^db:generate"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "dependsOn": ["^db:generate"],
      "cache": false
    },
    "db:generate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    },
    "test": {
      "dependsOn": ["^build", "^db:generate"]
    }
  }
}
```

### Shared UI component library

Example of adding a shared component library in `package.json` dependencies:

```json
{
  "dependencies": {
    "shared-components": "*" // Ensure this name matches the folder name of the shared component library
  }
}
```

## Useful resources

- [Turborepo Docs](https://turbo.build/docs)
