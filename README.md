
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev


Docker PostgreSQL Container

docker run -d --name my-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 postgres

docker exec -it movieapp psql -U admin  

CREATE DATABASE dbname

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,                                                
  release_date DATE NOT NULL
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```

## API Endpoints

{/}
{/, GET} 
{/movies}
{/movies/search, GET}
{/movies, GET} 
{/movies/:id, GET} 
{/movies, POST}
{/movies/:id, PUT} 
{/movies/:id, DELETE} 
{/genres}
{/genres, GET} 
{/genres/:id, GET} 
{/genres, POST} 
{/genres/:id, PUT} 
{/genres/:id, DELETE}

