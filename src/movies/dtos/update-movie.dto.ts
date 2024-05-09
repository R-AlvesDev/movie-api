import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsDateString, IsArray, IsNotEmpty } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
import { Genre } from 'src/genres/genre.model';

export class UpdateMovieDto extends PartialType(CreateMovieDto){
    id: number;

  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @IsOptional()
  @IsArray()
  genres?: Genre[];
}