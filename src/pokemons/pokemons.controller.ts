import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokedex')
export class PokemonsController {
  constructor(private pokemonService: PokemonsService) {}

  @Get('all/:limit/of/:offset')
  getAll(@Param('limit') limit: string, @Param('offset') offset: string) {
    const resp = this.pokemonService.findAll(parseInt(limit), parseInt(offset));
    return resp;
  }

  @Get('urlt/:url')
  getPokemonData(@Param('url') url: string) {
    const resp = this.pokemonService.getPokemonData(parseInt(url));
    return resp;
  }

  @Get(':pokemon')
  searchPokemon(@Param('pokemon') pokemon: string) {
    const resp = this.pokemonService.searchPokemon(pokemon);
    return resp;
  }
}
