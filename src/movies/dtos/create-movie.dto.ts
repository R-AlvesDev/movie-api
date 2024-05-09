import {
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from 'src/genres/genre.model';

export class CreateMovieDto {

  @ApiProperty({
    example: 'Movie Title',
    description: 'The title of the movie',
    required: true
  })
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 'Movie Description',
    description: 'Brief description of the movie',
    required: true
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'DD/MM/YYYY',
    description: 'Release date of the movie',
    required: true
  })
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({
    example: '["Action"]',
    description: 'List of atleast one genre of the movie',
    required: true
  })
  @IsArray()
  @ArrayNotEmpty()
  genres: Genre[];
}
