import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieBaseRepository: Repository<Movie>,
    private readonly movieCustomRepository: MovieRepository,
  ) {}

  async findAll(): Promise<Movie[]> {
    // Using movieBaseRepository for standard operations
    return await this.movieBaseRepository.find({ relations: ['genres'] });
  }
  
  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieBaseRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }
  
  async create(movie: Movie): Promise<Movie> {
    // Assuming create is a standard operation, using movieBaseRepository
    return await this.movieBaseRepository.save(movie);
  }
  
  async update(id: number, movieData: Movie): Promise<Movie> {
    const movie = await this.movieBaseRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    await this.movieBaseRepository.update(id, movieData);
    return await this.findOne(id); // This will load the updated movie with its relations
  }
  
  async delete(id: number): Promise<void> {
    const movie = await this.movieBaseRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    await this.movieBaseRepository.delete(id);
  }

  async findByTitle(title: string): Promise<Movie[]> {
    return await this.movieCustomRepository.find({
      where: { title: Like(`%${title}%`) },
    });
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return await this.movieCustomRepository.find({
      where: { genres: Like(`%${genre}%`) },
    });
  }  
}