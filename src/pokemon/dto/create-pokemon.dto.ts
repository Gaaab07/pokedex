import { IsInt, IsNotEmpty, IsPositive, isPositive, IsString, Min, minLength, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt() // Validamos que sea un string
    @IsPositive() // Validamos que sea un número positivo
    @Min(1) // Validamos que sea mayor o igual a 1
    no:number;

    @IsString() // Validamos que sea un string
    @IsNotEmpty() // Validamos que no esté vacío
    @MinLength(1) // Validamos que tenga al menos 1 carácter
    name: string;
}
