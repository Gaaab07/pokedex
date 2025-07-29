import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {



  transform(value: any, metadata: ArgumentMetadata) {
    //console.log( {value , metadata });
    if(!isValidObjectId(value)) {
      throw new Error(`El id ${value} no es un id de MongoDB válido`);
    }
    return value;
  }
}
