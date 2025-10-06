import { Injectable } from '@nestjs/common';
import { CreateEjecucionesDeConteoDto } from './dto/create-ejecuciones-de-conteo.dto';
import { UpdateEjecucionesDeConteoDto } from './dto/update-ejecuciones-de-conteo.dto';

@Injectable()
export class EjecucionesDeConteoService {
  create(createEjecucionesDeConteoDto: CreateEjecucionesDeConteoDto) {
    return 'This action adds a new ejecucionesDeConteo';
  }

  findAll() {
    return `This action returns all ejecucionesDeConteo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejecucionesDeConteo`;
  }

  update(id: number, updateEjecucionesDeConteoDto: UpdateEjecucionesDeConteoDto) {
    return `This action updates a #${id} ejecucionesDeConteo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejecucionesDeConteo`;
  }
}
