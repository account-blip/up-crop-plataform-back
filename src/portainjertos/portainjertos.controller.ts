import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortainjertosService } from './portainjertos.service';
import { CreatePortainjertoDto } from './dto/create-portainjerto.dto';
import { UpdatePortainjertoDto } from './dto/update-portainjerto.dto';
import { Portainjerto } from './entities/portainjerto.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('portainjertos')
export class PortainjertosController {
  constructor(private readonly portainjertosService: PortainjertosService) {}

  @Post()
  create(@Body() createPortainjertoDto: CreatePortainjertoDto) {
    return this.portainjertosService.create(createPortainjertoDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Portainjerto>> {
    return this.portainjertosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portainjertosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortainjertoDto: UpdatePortainjertoDto) {
    return this.portainjertosService.update(id, updatePortainjertoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portainjertosService.remove(id);
  }
}
