import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('Movie API')
  .setDescription('API for managing movies and genres')
  .setVersion('1.0')
  .build();

export const swaggerConfig = options;
