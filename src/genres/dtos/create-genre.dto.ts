import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    example: ' Action ',
    description: 'Name of the genre of the movie',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
