import {
  Controller,
  Get,
  HttpCode,
  Req,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { DoScgService } from './doScg.service';
import { MapDoScgDto } from './dto/map-doscg.dto';

@Controller('v1/doscg')
export class DoScgController {
  constructor(private readonly doScgService: DoScgService) {}

  @Get()
  @HttpCode(200)
  async callDoSCG(@Req() request, @Res() res: Response) {
    const response = 'DOSCG';
    return res.status(HttpStatus.OK).send(response);
  }

  @Get('/xyz')
  @HttpCode(200)
  async findXYZ(@Req() request, @Res() res: Response) {
    //function y+2 , 5 + 4 , 8 + 6 , 15 + 8 , 23 + 10
    const question = 'X, Y , 5, 9, 15, 23, Z';
    // plus : สำหรับ value เพิ่มขึ้น
    const z = await this.doScgService.checkValue(23, 23 - 15, 'plus');
    // minus : สำหรับ value ลดลง
    const y = await this.doScgService.checkValue(5, 9 - 5, 'minus');
    const x = await this.doScgService.checkValue(y, 5 - y, 'minus');

    const response = {
      x: x,
      y: y,
      z: z,
    };

    const data = {
      question: question,
      response: response,
    };
    return res.status(200).json(data);
  }

  @Get('/abc')
  @HttpCode(200)
  async findABC(@Req() request, @Res() res: Response) {
    const a = 21;
    const b = 23 - a;
    const c = -21 - a;
    const response = {
      question: 'A = 21, A + B = 23, A + C = -21',
      response: {
        A: a,
        B: b,
        C: c,
      },
    };
    return res.status(200).json(response);
  }

  @Get('/map')
  @HttpCode(200)
  async curlApiGoogleMap(
    @Req() request,
    @Res() res: Response,
    @Query() mapDoScgDto: MapDoScgDto,
  ) {
    const response = await this.doScgService.getApiMap(request);
    return res.status(200).json(response);
  }
}
