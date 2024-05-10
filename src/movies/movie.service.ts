import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In } from 'typeorm';
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
    @InjectRepository(Genre)
    private readonly genreRepository: GenreRepository,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<Movie[]> {
    return await this.movieBaseRepository.find({
      relations: ['genres'],
      skip: (page - 1) * limit,
      take: limit,
    });
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

  async search(title?: string, genre?: string, page: number = 1, limit: number = 10): Promise<Movie[]> {
    let findOptions = {
      relations: ['genres'],
      skip: (page - 1) * limit,
      take: limit,
    };
  
    let whereConditions = [];
  
    if (genre) {
      const genreEntities = await this.genreRepository.find({
        where: { name: Like(`%${genre}%`) }
      });
      if (genreEntities.length > 0) {
        const genreIds = genreEntities.map(genre => genre.id);
        whereConditions.push({ genres: { id: In(genreIds) } });
      }
    }
  
    if (title) {
      whereConditions.push({ title: Like(`%${title}%`) });
    }
  
    if (whereConditions.length > 0) {
      findOptions['where'] = whereConditions.length === 1 ? whereConditions[0] : { $or: whereConditions };
    }
  
    return await this.movieBaseRepository.find(findOptions);
  }

}