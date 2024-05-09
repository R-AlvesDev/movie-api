import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}