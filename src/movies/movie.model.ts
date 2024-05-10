import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable()
  genres: Genre[];
}