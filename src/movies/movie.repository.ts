import { Repository } from 'typeorm';
import { Movie } from './movie.model';

export class MovieRepository extends Repository<Movie> {
  // You can add custom methods specific to Movie here
}

