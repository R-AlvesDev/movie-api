import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.model';
import { GenreRepository } from './genre.repository';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { MovieRepository } from 'src/movies/movie.repository';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: GenreRepository,
    private readonly movieRepository: MovieRepository
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

  async delete(id: number): Promise<{ message: string }> {
    const genre = await this.genreRepository.findOne({ where: { id }, relations: ['movies'] });
  
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
  
    // If the genre is associated with any movies, remove the genre from those movies
    if (genre.movies && genre.movies.length > 0) {
      await this.movieRepository.createQueryBuilder()
        .relation(Genre, "movies")
        .of(genre)
        .remove(genre.movies);
    }
  
    await this.genreRepository.delete(id);
  
    return { message: `Genre with ID ${id} has been successfully deleted` };
  }
}
