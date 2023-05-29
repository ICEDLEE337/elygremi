# Elygremi

## Terms
- API = server
- EC2 = AWS Elastic Cloud Compute: a rented server owned/provisioned by AWS
- ECS = AWS Elastic Container Service: A service layered on top of EC2 that spins up Docker images and serves them on managed EC2 instances
- PostgreSQL = The most popular and most feature-rich SQL database used in enterprise software.
- S3 = AWS Simple Storage Service: a cloud-based file system from where files are served. Files can be encrypted and conditionally unlocked. A "bucket" is an atomic, top-level grouping of files with a globally unique name and its own configuration.


## Overview

- The UI is written in Angular 14 (current available version is 16).
- The server is written in an enterprise-centric NodeJS framework called NestJS that runs on top of the most popular NodeJS web server, ExpressJS. It's distributed as a Docker image.
- The entire application (API and UI) live in a single codebase (aka a monorepo) and the build tooling used to package the application is the popular monorepo framework NX.

## Runtime

node version: 16.17.0
npm version: 8.15.0

### Platform => AWS

#### API
This app is entirely cloud-native. The API is deployed as a Docker container from which AWS ECS creates a managed EC2 instance running the container.

#### UI
The UI is served by the API. This is suboptimal from a performance standpoint but is easier to deploy and update. It works but should be migrated to an architecture where the UI assets are served directly out of S3.

#### Database
The database is a serverless Postgres instance.

### Uploads
The uploaded images are stored in an encrypted, private S3 bucket. They cannot be accessed outside the context of the web application. In order to display them in the browser to the we app users, the API preauthorizes them thereby making them able to be accessed at a specific, unique URL for a short (configurable) period of time.

## Source Code Directory Structure
The code is split at the top level into `libs` and `apps`. The apps folder has UI and API applications. The libs folder has the same plus and isomorphic `iso` directory for code that is shared between API and UI.



