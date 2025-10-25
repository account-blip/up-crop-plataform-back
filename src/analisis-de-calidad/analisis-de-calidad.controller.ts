import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalisisDeCalidadService } from './analisis-de-calidad.service';
import { CreateAnalisisDeCalidadDto } from './dto/create-analisis-de-calidad.dto';
import { UpdateAnalisisDeCalidadDto } from './dto/update-analisis-de-calidad.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AnalisisCalidad } from './entities/analisis-de-calidad.entity';


@Controller('analisis-de-calidad')
export class AnalisisDeCalidadController {
  constructor(private readonly analisisDeCalidadService: AnalisisDeCalidadService) {}

  @Post()
  create(@Body() createAnalisisDeCalidadDto: CreateAnalisisDeCalidadDto) {
    return this.analisisDeCalidadService.create(createAnalisisDeCalidadDto);
  }

  @Get('user/:userId')
  findAll(@Paginate() query: PaginateQuery, @Param('userId') userId:string): Promise<Paginated<AnalisisCalidad>> {
    return this.analisisDeCalidadService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analisisDeCalidadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalisisDeCalidadDto: UpdateAnalisisDeCalidadDto) {
    return this.analisisDeCalidadService.update(id, updateAnalisisDeCalidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analisisDeCalidadService.remove(id);
  }
}
