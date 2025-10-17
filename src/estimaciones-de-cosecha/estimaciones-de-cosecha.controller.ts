import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstimacionesDeCosechaService } from './estimaciones-de-cosecha.service';
import { CreateEstimacionDeCosechaDto } from './dto/create-estimacion-de-cosecha.dto';
import { UpdateEstimacionDeCosechaDto } from './dto/update-estimacion-de-cosecha.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { EstimacionDeCosecha } from './entities/estimacion-de-cosecha.entity';

@Controller('estimaciones-de-cosecha')
export class EstimacionesDeCosechaController {
  constructor(private readonly estimacionesDeCosechaService: EstimacionesDeCosechaService) {}

  @Post()
  create(@Body() createEjecucionesDeConteoDto: CreateEstimacionDeCosechaDto) {
    return this.estimacionesDeCosechaService.create(createEjecucionesDeConteoDto);
  }

  @Get('user/:userId')
  findAll(@Paginate() query: PaginateQuery, @Param('userId') userId:string): Promise<Paginated<EstimacionDeCosecha>> {
    return this.estimacionesDeCosechaService.findAll(query,userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimacionesDeCosechaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjecucionesDeConteoDto: UpdateEstimacionDeCosechaDto) {
    return this.estimacionesDeCosechaService.update(id, updateEjecucionesDeConteoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimacionesDeCosechaService.remove(id);
  }
}
