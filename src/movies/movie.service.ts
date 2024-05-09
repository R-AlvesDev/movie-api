import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {
    console.log('MovieRepository in MovieService:', this.movieRepository);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find({ relations: ['genres'] }); // Eager loading for genres
  }

  async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne({ where: { id }, relations: ['genres'] });
  }

  async create(movie: Movie): Promise<Movie> {
    return await this.movieRepository.save(movie);
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    await this.movieRepository.update(id, movie);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async findByTitle(title: string): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { title: Like(`%${title}%`) }, // Search by title containing the provided string
    });
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { genres: Like(`%${genre}%`) },
    });
  }  
  
}