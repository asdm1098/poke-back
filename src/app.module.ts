import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons/pokemons.controller';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokemonsService } from './pokemons/pokemons.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PokemonsModule,
    HttpModule,
  ],
  controllers: [AppController, PokemonsController],
  providers: [AppService, PokemonsService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
