import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateVariedadeDto } from './dto/create-variedade.dto';
import { UpdateVariedadeDto } from './dto/update-variedade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variedad } from './entities/variedad.entity';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class VariedadesService {
  private readonly logger = new Logger(VariedadesService.name);

  constructor(
    @InjectRepository(Variedad)
    private readonly variedadRepository: Repository<Variedad>,
  ) {}

  async create(createVariedadeDto: CreateVariedadeDto) {
    try{

      const variedad = this.variedadRepository.create(createVariedadeDto);

      const savedVariedad = await this.variedadRepository.save(variedad);

      return savedVariedad;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Variedad>> {
    try {
      return await paginate(query, this.variedadRepository, {
        sortableColumns: ['id', 'nombre'],
        nullSort: 'last',
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['nombre'],
        filterableColumns: {
          nombre: [FilterOperator.ILIKE, FilterOperator.EQ],
        },
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findOne(id: string) {
    try{
      const variedad = await this.variedadRepository.findOne({
        where: { id }
      });

      if (!variedad) {
        throw new NotFoundException(`Variedad not found`);
      }

      return variedad;
    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async update(id: string, updateVariedadeDto: UpdateVariedadeDto) {
    try {
      const variedad = await this.variedadRepository.findOne({
        where: { id }
      });
  
      if (!variedad) {
        throw new NotFoundException(`Variedad not found`);
      }
      const updateVariedad = this.variedadRepository.merge(variedad, updateVariedadeDto);

      const savedVariedad = await this.variedadRepository.save(updateVariedad);

      return savedVariedad
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }


  async remove(id: string) {
    try{
      const variedad = await this.variedadRepository.findOne({
        where: { id }
      });
  
      if (!variedad) {
        throw new NotFoundException(`Variedad not found`);
      }

      await this.variedadRepository.remove(variedad);

      return {message: 'Variedad removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
