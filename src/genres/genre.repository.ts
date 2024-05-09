import { Repository } from 'typeorm';
import { Genre } from './genre.model'; 
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreRepository extends Repository<Genre> {}


