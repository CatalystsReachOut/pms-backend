import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Eatviors!';
  }

  adminAccessibleApi() {
    return 'Admin Accessible API';
  }

  clientAccessibleApi() {
    return 'Client Accessible API';
  }
}
