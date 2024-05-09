import { Repository } from 'typeorm';
import { Movie } from './movie.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieRepository extends Repository<Movie> {}

