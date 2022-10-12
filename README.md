# E-Commerce Training
This is the server for e-commerce training.

## Tech stacks
NestJS, PostgresSQL, TypeORM

## Run Locally
**Install dependencies**
```bash
yarn or yarn install
```

**Run docker**
**Note:** Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) first.

```bash
docker compose up
```

**Run migration**
```bash
yarn run migrate:up
```

**Run server**
```bash
yarn start:dev
```

Default port is `8080`

The server will run on `http://localhost:8080/api/8080`
The APIs document will run on `http://localhost:8080/api/documentation`

**Note:** 
- If the Postgres is not found, please try installing [PostgresSQL](https://www.postgresql.org/download/)
- Insert data, please import all sql files in `src/database/seeds/*.sql` on TablePlus.

## Others
- Install [TablePlus](https://tableplus.com/) for managing database
- Install [Postman](https://www.postman.com/) for testing API (if need)