import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsDateString, IsArray, IsNotEmpty } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
import { Genre } from 'src/genres/genre.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  id: number;

  @ApiProperty({
    example: 'Movie Title',
    description: 'The title of the movie',
    required: true
  })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    example: 'Movie Description',
    description: 'Brief description of the movie',
    required: true
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'DD/MM/YYYY',
    description: 'Release date of the movie',
    required: true
  })
  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @ApiProperty({
    example: '["Action"]',
    description: 'List of atleast one genre of the movie',
    required: true
  })
  @IsOptional()
  @IsArray()
  genres?: Genre[];
}
