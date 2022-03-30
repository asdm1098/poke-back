import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../interfaces/Pokemon';

describe('PokemonsController', () => {
  let controller: PokemonsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PokemonsController],
      providers: [PokemonsService],
    }).compile();

    controller = module.get<PokemonsController>(PokemonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('getPokemon', () => {
  let controller: PokemonsController;
  let pokemonService: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PokemonsController],
      providers: [PokemonsService],
    }).compile();

    controller = module.get<PokemonsController>(PokemonsController);
    pokemonService = module.get<PokemonsService>(PokemonsService);
  });

  it('retornar un tipo Pokemon', async () => {
    jest
      .spyOn(pokemonService, 'getPokemon')
      .mockImplementation(() =>
        Promise.resolve([{ name: 'example' }] as unknown as Promise<Pokemon>),
      );

    const result = await controller.getPokemon('pikachu');
    expect(result).toHaveLength(1);
    expect(pokemonService.getPokemon).toHaveBeenCalledTimes(1);
  });
});
