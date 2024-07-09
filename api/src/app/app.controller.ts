import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  checkAvailability() {
    return 'service is available';
  }
}
