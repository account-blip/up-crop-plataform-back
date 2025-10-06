import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjecucionDeConteoService } from './ejecucion-de-conteo.service';
import { CreateEjecucionDeConteoDto } from './dto/create-ejecucion-de-conteo.dto';
import { UpdateEjecucionDeConteoDto } from './dto/update-ejecucion-de-conteo.dto';

@Controller('ejecucion-de-conteo')
export class EjecucionDeConteoController {
  constructor(private readonly ejecucionDeConteoService: EjecucionDeConteoService) {}

  @Post()
  create(@Body() createEjecucionDeConteoDto: CreateEjecucionDeConteoDto) {
    return this.ejecucionDeConteoService.create(createEjecucionDeConteoDto);
  }

  @Get()
  findAll() {
    return this.ejecucionDeConteoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejecucionDeConteoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjecucionDeConteoDto: UpdateEjecucionDeConteoDto) {
    return this.ejecucionDeConteoService.update(+id, updateEjecucionDeConteoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejecucionDeConteoService.remove(+id);
  }
}
