import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.model';

@Controller('genres')
export class GenreController {
  constructor(private readonly genresService: GenreService) {}

  @Get()
  async findAll(): Promise<Genre[]> {
    return await this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Genre> {
    return await this.genresService.findOne(id);
  }

  @Post()
  async create(@Body() genre: Genre): Promise<Genre> {
    return await this.genresService.create(genre);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() genre: Genre): Promise<Genre> {
    return await this.genresService.update(id, genre);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.genresService.delete(id);
  }
}
