import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GenreRepository } from 'src/genres/genre.repository';
import { Genre } from 'src/genres/genre.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieBaseRepository: Repository<Movie>,
    private readonly movieCustomRepository: MovieRepository,
    @InjectRepository(Genre)
    private readonly genreRepository: GenreRepository,
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
  
    const genreEntities = await Promise.all(createMovieDto.genres.map(async (genreName) => {
      let genre = await this.genreRepository.findOne({ where: { name: Like(`%${genreName}%`) } });
      if (!genre) {
        genre = this.genreRepository.create({ name: genreName } as unknown as Genre);
        await this.genreRepository.save(genre);
      }
      return genre;
    }));
  
    movie.genres = genreEntities;
  
    await this.movieBaseRepository.save(movie);
    return movie;
  }
  
  async update(id: number, movieData: Movie): Promise<Movie> {
    const movie = await this.movieBaseRepository.findOne({
      where: { id },
      relations: ['genres']
    });
  
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  
    // Update scalar fields
    movie.title = movieData.title || movie.title;
    movie.description = movieData.description || movie.description;
    movie.releaseDate = movieData.releaseDate || movie.releaseDate;
  
    if (movieData.genres) {
      const genres = await Promise.all(movieData.genres.map(async (genreName) => {
        let genre = await this.genreRepository.findOne({ where: { name: Like(`%${genreName}%`) } });
        if (!genre) {
          genre = this.genreRepository.create({ name: genreName } as unknown as Genre);
          await this.genreRepository.save(genre);
        }
        return genre;
      }));
  
      movie.genres = genres;
    }
  
    await this.movieBaseRepository.save(movie);
    return movie;
  }
  
  async delete(id: number): Promise<{ message: string }> {
    const movie = await this.movieBaseRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    await this.movieBaseRepository.delete(id);
    return { message: `Movie with ID ${id} has been successfully deleted` };
  }

  async search(title?: string, genre?: string): Promise<Movie[]> {
    let whereCondition = [];
    
    if (title) {
      whereCondition.push({ title: Like(`%${title}%`) });
    }
    
    if (genre) {
      whereCondition.push({ 'genres': Like(`%${genre}%`) });
    }
    
    if (whereCondition.length === 0) {
      return this.findAll();
    }

    return await this.movieBaseRepository.find({
      where: whereCondition,
      relations: ['genres'],
    });
  }

}