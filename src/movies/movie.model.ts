import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Genre } from '../genres/genre.model';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @OneToMany(() => Genre, genre => genre.movies)
  genres: Genre[];
}
