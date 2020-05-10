# Template for Rest API using NodeJs and MongoDB
Starter pack to build API projects with NodeJs, running Mongo as database.

# Dependencies
- Docker
- Docker Compose
- Makefile
- Postman

## Features
- Runs with NodeJs v10.18.1 (with alpine Docker image)
- Build with Express Framework
- Eslint Config
- MongoDB (docker image)
- Docs for requests with Postman
- Pino Logger for JSON logs
- Error handlers
- Basic and Bearer Authorization
- Configuration with .env and config files
- Basic routes for GET and POST users with Mongo

## Setup

- Copy `sample.env` content in a new `.env` file. Fill `.env` with required configs. Example:

```
DB_PASSWORD=mypassword123
DB_USER=mydatabaseuser
JWT_SECRET=SeCRet2020HaSh
```

Install images, dependencies on docker containers for API and Mongo:

```bash
$ make build
```

## Local deployment
Start containers with command:

```
$ make start
```

You may see latest API logs with command:

```
$ make logs-tail
```

If everything works, API logs will show you a message like:

```
[AAAA-MM-DD HH:mm:ss +0000] INFO  (624 on 9cc0c99d1c90): Connected successfully to MongoDB
[AAAA-MM-DD HH:mm:ss +0000] INFO  (624 on 9cc0c99d1c90): Template API (development) listening at 3333
```

API is up and running at port **3333**! :)

Nodemon will listen to changes to local files and reload API for development.

To stop API and mongo containers, use the command:
```
$ make stop
```

## Postman Docs
Available routes and parameters for API routes are documented at Postman collection.

To import the collection and environment variables, select **Import** button on Postman. Select files `postman/template-mongo-node-api.postman_collection.json` and `postman/template-node-api.postman_environment.json`.

## Other useful commands

If you need to access API docker container bash, use the command:
```
$ make bash
```

If you need to access Mongo docker container bash, use the command:
```
$ make bash-mongo
```

Mongo registers are saved to `data/` folder. If you want to rebuild the database reseting the data, use the command:

```
$ make rebuild
```
