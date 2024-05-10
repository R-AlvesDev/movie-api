import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@ApiTags('Movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}


  @Get('/search')
  async search(@Query('title') title: string, @Query('genre') genre: string): Promise<Movie[]> {
    return await this.moviesService.search(title, genre);
  }
  
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
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.moviesService.delete(id);
  }

}
