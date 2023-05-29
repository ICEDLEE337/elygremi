# Elygremi

## Terms
- Angular = UI SPA framework, most used in enterprise UI development
- Angular Material = Component library written for Angular
- API = server
- Cloudfront = AWS Cloudfront: an edge-caching service with additional features.
- Cognito = AWS identity service that features an identity pool (at its core) as well as a number of associated services like token generation and credential management.
- CSS = Cascading Style Sheets: syntax for styling web UIs
- Docker = a containerization framework that provides features analogous to virtualization (w/o actually using any virtualization).
- EC2 = AWS Elastic Cloud Compute: a rented server owned/provisioned by AWS
- ECS = AWS Elastic Container Service: A service layered on top of EC2 that spins up Docker images and serves them on managed EC2 instances
- ORM = object relational mapper: code contructs that abstract database interactions.
- PostgreSQL = The most popular and most feature-rich SQL database used in enterprise software.
- S3 = AWS Simple Storage Service: a cloud-based file system from where files are served. Files can be encrypted and conditionally unlocked. A "bucket" is an atomic, top-level grouping of files with a globally unique name and its own configuration.
- SPA = single page application
- Tailwind = UI CSS framework for declarative CSS using a compiler.
- Terraform = IaC (Infrastructure as Code) tool that is used to script the provisioning and deprovisioning of cloud resources. It maintains the state of provisioned resources and can handle incremental changes.
- TypeORM = a popular TypeScript-based ORM.

## Overview

- The UI is written in Angular 14 (current available version is 16) and uses both Angular Material as well as Tailwind as a design system.
- The server is written in an enterprise-centric NodeJS framework called NestJS that runs on top of the most popular NodeJS web server, ExpressJS. It's distributed as a Docker image.
- The entire application (API and UI) live in a single codebase (aka a monorepo) and the build tooling used to package the application is the popular monorepo framework NX. Even the infrastructure code lives in the same repository.
- The provisioning is done with Terraform. The code is in the /terraform directory.

## Runtime

- node version: 16.17.0
- npm version: 8.15.0

### Platform => AWS

#### API
This app is entirely cloud-native. The API is deployed as a Docker container from which AWS ECS creates a managed EC2 instance running the container.

#### UI
The UI is served by the API. This is suboptimal from a performance standpoint but is easier to deploy and update. It works but should be migrated to an architecture where the UI assets are served directly out of S3 if scale reaches a certain threshold or development cycles afford the time to set up the additional infrastructure (Cloudfront and S3 Bucket hosting all provisioned through Terraform)

#### Database
The database is a serverless Postgres instance and is accessed from application logic via TypeORM.

### Uploads
The uploaded images are stored in an encrypted, private S3 bucket. They cannot be accessed outside the context of the web application. In order to display them in the browser to the we app users, the API preauthorizes them thereby making them able to be accessed at a specific, unique URL for a short (configurable) period of time.

## Source Code Directory Structure
The code is split at the top level into `libs` and `apps`. The apps folder has UI and API applications. The libs folder has the same plus and isomorphic `iso` directory for code that is shared between API and UI.

The apps directory has one API application and one UI application.

## Accessing the Application
- The UI, which communicates with the server is available at https://account.onivoro.net
- The server is accessible as an API at https://account.onivoro.net/api
- The server also serves executable API documentation which is accessible at https://account.onivoro.net/dox (only the "public" endpoints can be executed from this document)
