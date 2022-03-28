import { Injectable } from '@nestjs/common';
import { AppModule } from './app.module';

@Injectable()
export class AppService {
  getHello(): string {
    return `Servidor corriendo en puerto ${AppModule.port} `;
  }
}
