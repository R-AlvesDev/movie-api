import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieBaseRepository: Repository<Movie>,
    private readonly movieCustomRepository: MovieRepository,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.movieBaseRepository.find({ relations: ['genres'] });
  }
  
  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieBaseRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }
  
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();

    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.releaseDate = createMovieDto.releaseDate;

    await this.movieBaseRepository.save(movie);
    return movie;
  }
  
  async update(id: number, movieData: Movie): Promise<Movie> {
    const movie = await this.movieBaseRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    await this.movieBaseRepository.update(id, movieData);
    return await this.findOne(id); 
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