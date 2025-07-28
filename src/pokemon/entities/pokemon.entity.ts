import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    //id:string // mongo nos lo da automaticamente
    @Prop({
        unique: true, //el name tiene que ser unico
        index: true, //para que se pueda buscar por name
    })
    name: string;
    @Prop({
        unique: true, 
        index: true, //para que se pueda buscar por numeroo
    })
    no:string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
