import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonsService {
  constructor(private http: HttpService) {}

  async findAll(
    limit: number,
    offset: number,
  ): Promise<Observable<AxiosResponse<any>>> {
    try {
      const value = await lastValueFrom(
        this.http.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        ),
      );
      return value.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getPokemonData(url: number): Promise<Observable<AxiosResponse<any>>> {
    try {
      const resp = await firstValueFrom(
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${url}`),
      );
      return resp.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async searchPokemon(
    pokemon: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    try {
      const resp = await firstValueFrom(
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
      );

      return resp.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
