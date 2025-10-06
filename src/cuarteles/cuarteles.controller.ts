import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuartelesService } from './cuarteles.service';
import { CreateCuarteleDto } from './dto/create-cuartele.dto';
import { UpdateCuarteleDto } from './dto/update-cuartele.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Cuartel } from './entities/cuartel.entity';

@Controller('cuarteles')
export class CuartelesController {
  constructor(private readonly cuartelesService: CuartelesService) {}

  @Post()
  create(@Body() createCuarteleDto: CreateCuarteleDto) {
    return this.cuartelesService.create(createCuarteleDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Cuartel>> {
    return this.cuartelesService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuartelesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuarteleDto: UpdateCuarteleDto) {
    return this.cuartelesService.update(id, updateCuarteleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuartelesService.remove(id);
  }
}
