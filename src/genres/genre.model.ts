import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movie.model';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
