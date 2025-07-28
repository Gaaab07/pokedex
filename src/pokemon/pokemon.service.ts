import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name ) // Inyectamos el modelo de Pokemon
    private readonly pokemonModel:Model<Pokemon>) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase(); // Convertimos el nombre a minúsculas
    try {
    const pokemon = await this.pokemonModel.create(createPokemonDto);
    return pokemon;
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;
    if(!isNaN(+term)) { // Si el término es un número
      pokemon = await this.pokemonModel.findOne({ no: term }); // Buscamos por número
    }
    //mongoid
    if(!pokemon && isValidObjectId(term)) // Si el término es un ObjectId válido
    { pokemon=await this.pokemonModel.findById(term)// Si el término es un ObjectId válido
    }
    //name
    if(!pokemon){ //si no hemos encontrado el pokemon por numero o id
      pokemon= await this.pokemonModel.findOne({name:term.toLocaleLowerCase().trim()}) // Buscamos por nombre
    }
    if(!pokemon){ // Si no se encontró el Pokémon
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term); // Buscamos el Pokémon
    if (updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase(); // Convertimos el nombre a minúsculas
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto}; // Retornamos el Pokémon actualizado
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
