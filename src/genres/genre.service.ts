import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.model';
import { GenreRepository } from './genre.repository';

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

  async create(genre: Genre): Promise<Genre> {
    return await this.genreRepository.save(genre);
  }

  async update(id: number, genre: Genre): Promise<Genre> {
    await this.genreRepository.update(id, genre);
    return await this.genreRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
