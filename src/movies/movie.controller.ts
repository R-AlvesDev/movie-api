import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@ApiTags('Movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return await this.moviesService.findOne(id); 
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie: Movie = {
      ...updateMovieDto,
      title: updateMovieDto.title,
      description: updateMovieDto.description,
      releaseDate: updateMovieDto.releaseDate,
      genres: updateMovieDto.genres,
     };
     return this.moviesService.update(id, updatedMovie);
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
