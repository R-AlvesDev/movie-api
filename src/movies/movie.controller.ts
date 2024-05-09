import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return await this.moviesService.findOne(id); // Removed relations argument
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return await this.moviesService.create(movie);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    return await this.moviesService.update(id, movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.moviesService.delete(id);
  }

  // Basic search by title (can be extended for genre or other criteria)
  @Get('/search')
  async searchByTitle(@Query('title') title: string): Promise<Movie[]> {
    return await this.moviesService.findByTitle(title);
  }
}
