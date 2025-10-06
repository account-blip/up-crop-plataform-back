import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Campo } from './entities/campo.entity';


@Controller('campos')
export class CampoController {
  constructor(private readonly campoService: CampoService) {}

  @Post()
  create(@Body() createCampoDto: CreateCampoDto) {
    return this.campoService.create(createCampoDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Campo>> {
    return this.campoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampoDto: UpdateCampoDto) {
    return this.campoService.update(id, updateCampoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campoService.remove(id);
  }
}
