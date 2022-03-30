import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from '../pokemons/interfaces/Pokemon';

@Controller('pokedex')
export class PokemonsController {
  constructor(private pokemonService: PokemonsService) {}

  @Get(':pokemo')
  getPokemon(@Param() params): Promise<Pokemon> {
    return this.pokemonService.getPokemon(params);
  }

  @Get('get/:limit/of/:offset')
  getPokemones(@Param() params) {
    return this.pokemonService.getPokemons(params);
  }
}
