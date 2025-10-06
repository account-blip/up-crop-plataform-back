import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariedadesService } from './variedades.service';
import { CreateVariedadeDto } from './dto/create-variedade.dto';
import { UpdateVariedadeDto } from './dto/update-variedade.dto';
import { Variedad } from './entities/variedad.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('variedades')
export class VariedadesController {
  constructor(private readonly variedadesService: VariedadesService) {}

  @Post()
  create(@Body() createVariedadeDto: CreateVariedadeDto) {
    return this.variedadesService.create(createVariedadeDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Variedad>> {
    return this.variedadesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variedadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariedadeDto: UpdateVariedadeDto) {
    return this.variedadesService.update(id, updateVariedadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variedadesService.remove(id);
  }
}
