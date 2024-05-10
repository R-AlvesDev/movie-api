import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.model';
import { GenreRepository } from './genre.repository';
import { CreateGenreDto } from './dtos/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    return await this.genreRepository.findOne({ where: { id } });
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    // Check if the genre already exists
    const existingGenre = await this.genreRepository.findOne({
      where: { name: createGenreDto.name },
    });
  
    if (existingGenre) {
      throw new Error(`Genre with name '${createGenreDto.name}' already exists.`);
    }
  
    const genre = new Genre();
    genre.name = createGenreDto.name;
    return await this.genreRepository.save(genre);
  }

  async update(id: number, genre: Genre): Promise<Genre> {
    await this.genreRepository.update(id, genre);
    return await this.genreRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<{ message: string }> {
    const genre = await this.genreRepository.findOneBy({ id });

    if(!genre){
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    await this.genreRepository.delete(id);

    return { message: `Genre with ID ${id} has been successfully deleted` }
  }
}
