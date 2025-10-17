import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoEspecificoService } from './campo-especifico.service';
import { CreateCampoEspecificoDto } from './dto/create-campo-especifico.dto';
import { UpdateCampoEspecificoDto } from './dto/update-campo-especifico.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CampoEspecifico } from './entities/campo-especifico.entity';


@Controller('campos-especificos')
export class CampoEspecificoController {
  constructor(private readonly campoEspecificoService: CampoEspecificoService) {}

  @Post()
  create(@Body() createCampoEspecificoDto: CreateCampoEspecificoDto) {
    return this.campoEspecificoService.create(createCampoEspecificoDto);
  }

  @Get('user/:userId')
  findAll(@Paginate() query: PaginateQuery, @Param('userId') userId:string): Promise<Paginated<CampoEspecifico>> {
    return this.campoEspecificoService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campoEspecificoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampoEspecificoDto: UpdateCampoEspecificoDto) {
    return this.campoEspecificoService.update(id, updateCampoEspecificoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campoEspecificoService.remove(id);
  }
}
