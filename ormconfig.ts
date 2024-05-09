import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from './src/movies/movie.model';
import { Genre } from './src/genres/genre.model';

const config: TypeOrmModuleOptions = {
   type: 'postgres', 
   host: 'localhost',
   port: 5432, 
   username: 'admin',
   password: '2835',
   database: 'movie_app',
  entities: [Movie, Genre],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: true,
};

export default config;