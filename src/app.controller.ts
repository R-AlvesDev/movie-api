import { Controller, Get, Post, Put, Delete, Body, Param, Res } from '@nestjs/common';
import { MovieService } from './movies/movie.service';
import { GenreService } from './genres/genre.service';
import { Movie } from './movies/movie.model';
import { Genre } from './genres/genre.model';
import { Response } from 'express';
import { CreateMovieDto } from './movies/dtos/create-movie.dto';


@Controller('/')
export class AppController {
  constructor(
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
  ) {}

  @Get('/')
  async home(@Res() res: Response) {
    res.redirect('/api/docs');
  }

  @Get('/movies')
  async findAllMovies(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }

  @Get('/movies/:id')
  async findOneMovie(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.findOne(id);
  }

  @Post('/movies')
  async createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    const createMovieDto: CreateMovieDto = {
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genres: movie.genres, 
    };
  
    return await this.movieService.create(createMovieDto);
  }z

  @Put('/movies/:id')
  async updateMovie(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    return await this.movieService.update(id, movie);
  }

  @Delete('/movies/:id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    return await this.movieService.delete(id);
  }

  // Genre management
  @Get('/genres')
  async findAllGenres(): Promise<Genre[]> {
    return await this.genreService.findAll();
  }

  @Post('/genres')
  async createGenre(@Body() genre: Genre): Promise<Genre> {
    return await this.genreService.create(genre);
  }

}