import { Injectable } from '@nestjs/common';
import { CreateEjecucionDeConteoDto } from './dto/create-ejecucion-de-conteo.dto';
import { UpdateEjecucionDeConteoDto } from './dto/update-ejecucion-de-conteo.dto';

@Injectable()
export class EjecucionDeConteoService {
  create(createEjecucionDeConteoDto: CreateEjecucionDeConteoDto) {
    return 'This action adds a new ejecucionDeConteo';
  }

  findAll() {
    return `This action returns all ejecucionDeConteo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejecucionDeConteo`;
  }

  update(id: number, updateEjecucionDeConteoDto: UpdateEjecucionDeConteoDto) {
    return `This action updates a #${id} ejecucionDeConteo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejecucionDeConteo`;
  }
}
