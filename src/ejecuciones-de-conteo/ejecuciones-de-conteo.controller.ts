import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjecucionesDeConteoService } from './ejecuciones-de-conteo.service';
import { CreateEjecucionesDeConteoDto } from './dto/create-ejecuciones-de-conteo.dto';
import { UpdateEjecucionesDeConteoDto } from './dto/update-ejecuciones-de-conteo.dto';

@Controller('ejecuciones-de-conteo')
export class EjecucionesDeConteoController {
  constructor(private readonly ejecucionesDeConteoService: EjecucionesDeConteoService) {}

  @Post()
  create(@Body() createEjecucionesDeConteoDto: CreateEjecucionesDeConteoDto) {
    return this.ejecucionesDeConteoService.create(createEjecucionesDeConteoDto);
  }

  @Get()
  findAll() {
    return this.ejecucionesDeConteoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejecucionesDeConteoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjecucionesDeConteoDto: UpdateEjecucionesDeConteoDto) {
    return this.ejecucionesDeConteoService.update(+id, updateEjecucionesDeConteoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejecucionesDeConteoService.remove(+id);
  }
}
