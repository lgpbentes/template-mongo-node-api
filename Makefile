#!make
include .env
export $(shell sed 's/=.*//' .env)

build:
	docker-compose build
	docker-compose run --no-deps --rm api yarn

rebuild:
	sudo rm -rf node_modules data
	docker-compose build
	docker-compose run --no-deps --rm api yarn

start:
	docker-compose up -d

stop:
	docker-compose down

logs:
	docker-compose logs -f

logs-tail:
	docker logs -f --tail 100 template-mongo-node-api | node_modules/.bin/pino-pretty --translateTime

bash:
	docker-compose exec api sh

bash-mongo:
	docker-compose exec mongo mongo --username $(DB_USER) --password
	