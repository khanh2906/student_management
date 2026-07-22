import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'He thong Quan ly Sinh vien dang hoat dong',
    };
  }
}
