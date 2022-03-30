import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { Pokemon } from './interfaces/Pokemon';

@Injectable()
export class PokemonsService {
  constructor(private http: HttpService) {}

  // private api: `https://pokeapi.co/api/v2/pokemon`;
  // getPokemon(params) {
  //   return {
  //     ...this.data[params.pokemon],
  //   };
  // }
  // getPokemon2(params) {
  //   return this.http
  //     .get(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
  //     .pipe(
  //       map((response) => response.data),
  //       map((data) => ({
  //         id: data.id,
  //         name: data.name,
  //         type: data.types[0].type.name,
  //       })),
  //     );
  // }

  async getPokemon({ pokemo }): Promise<Pokemon> {
    const resp = await firstValueFrom(
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemo}`),
    );

    const { data } = resp;
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      types: data.types.map((tp) => tp.type.name),
      urlImg: data?.sprites?.front_default,
    };

    return pokemon;
  }

  async getPokemons({ limit, offset }) {
    const resp = await lastValueFrom(
      this.http.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      ),
    );
    const { results, count } = resp.data;
    // const pokemones: Pokemon[] = [];
    // data.forEach((pokemon) => {
    //   pokemones.push({
    //     id: pokemon.id,
    //     name: pokemon.name,
    //     type: pokemon.types[0].type.name,
    //     urlImg: pokemon?.sprites?.front_default,
    //   });
    // });
    return { results, count };
  }
}
