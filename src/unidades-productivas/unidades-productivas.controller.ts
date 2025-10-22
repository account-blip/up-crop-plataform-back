import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnidadesProductivasService } from './unidades-productivas.service';
import { CreateUnidadesProductivaDto } from './dto/create-unidades-productiva.dto';
import { UpdateUnidadesProductivaDto } from './dto/update-unidades-productiva.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UnidadesProductiva } from './entities/unidades-productiva.entity';


@Controller('unidades-productivas')
export class UnidadesProductivasController {
  constructor(private readonly unidadesProductivasService: UnidadesProductivasService) {}

  @Post()
  create(@Body() createUnidadesProductivaDto: CreateUnidadesProductivaDto) {
    return this.unidadesProductivasService.create(createUnidadesProductivaDto);
  }

  @Get('user/:userId')
  findAll(@Paginate() query: PaginateQuery, @Param('userId') userId:string): Promise<Paginated<UnidadesProductiva>> {
    return this.unidadesProductivasService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesProductivasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadesProductivaDto: UpdateUnidadesProductivaDto) {
    return this.unidadesProductivasService.update(id, updateUnidadesProductivaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesProductivasService.remove(id);
  }
}
