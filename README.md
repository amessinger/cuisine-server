# Cuisine server

An api server to store recipes and ingredients.

## Prerequisites

[Docker](https://www.docker.com/get-started)

## Setup

Create a new configuration file off of the sample one:

`cp env-sample .env` (make optional edits)

## Run

`docker-compose up`

## Develop

Use any editor compatible with devcontainers. Ideally [Microsoft Visual Studio Code](https://code.visualstudio.com/) or [Github Code Spaces](https://github.com/features/codespaces).

If you don't want to use neither, you should be able to start `docker-compose` with `./devcontainer/docker-compose.yml` as configuration file, like so: `docker-compose --project-name server -f docker-compose.yml -f .devcontainer/docker-compose.yml up --build`.

You'll be missing `yarn` which is used for managing packages which can be added by running `apk add --no-cache yarn; yarn` in a terminal in the server container.

## Test

`yarn test` for one time tests run, `yarn test:watch` for continuous tests running (watches file changes).