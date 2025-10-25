import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DefectosService } from './defectos.service';
import { CreateDefectoDto } from './dto/create-defecto.dto';
import { Defecto } from './entities/defecto.entity';
import { UpdateDefectoDto } from './dto/update-defecto.dto';


@Controller('defectos')
export class DefectosController {
  constructor(private readonly defectosService: DefectosService) {}

  @Post()
  create(@Body() createDefectoDto: CreateDefectoDto) {
    return this.defectosService.create(createDefectoDto);
  }

  @Get('user/:userId')
  findAll(@Paginate() query: PaginateQuery, @Param('userId') userId:string): Promise<Paginated<Defecto>> {
    return this.defectosService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateDefectoDto: UpdateDefectoDto) {
    return this.defectosService.update(id, UpdateDefectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectosService.remove(id);
  }
}
