import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movies/movie.service';
import { GenreService } from './genres/genre.service';
import { Movie } from './movies/movie.model';

@Controller('/')
export class AppController {
  constructor(
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
  ) {}

  @Get('/')
  async home() {
    return 'Welcome to your NestJS Movie API!';
  }

  // Get all movies
  @Get('/movies')
  async findAllMovies(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }

  // Get a movie by ID
  @Get('/movies/:id')
  async findOneMovie(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.findOne(id);
  }

  // Additional routes can be added here for other functionalities
  // (e.g., create, update, delete movies, manage genres)
}
