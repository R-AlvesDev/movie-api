import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}