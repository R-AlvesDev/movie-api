import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GenreService } from './genres/genre.service';
import { MovieService } from './movies/movie.service';
import { Genre } from './genres/genre.model'; 
import { GenreRepository } from './genres/genre.repository';
import { MovieRepository } from './movies/movie.repository';
import { Movie } from './movies/movie.model';

import ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Movie, Genre]),
  ],
  controllers: [AppController],
  providers: [GenreService, MovieService, MovieRepository, GenreRepository],
})
export class AppModule {}
