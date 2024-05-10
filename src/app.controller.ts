import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';


@Controller('/')
export class AppController {
  constructor(

  ) {}

  @Get('/')
  async home(@Res() res: Response) {
    res.redirect('/api/docs');
  }
}