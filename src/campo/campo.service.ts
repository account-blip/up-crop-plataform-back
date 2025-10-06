import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campo } from './entities/campo.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class CampoService {
  private readonly logger = new Logger(CampoService.name);

  constructor(
    @InjectRepository(Campo)
    private readonly campoRepository: Repository<Campo>,
  ) {}

  async create(createCampoDto: CreateCampoDto) {
    try{

      const campo = this.campoRepository.create(createCampoDto);

      const savedCampo = await this.campoRepository.save(campo);

      return savedCampo;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Campo>> {
    try {
      return await paginate(query, this.campoRepository, {
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
    try {
      const campo = await this.campoRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Campo not found`);
      }
  
      return campo;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateCampoDto: UpdateCampoDto) {
    try {
      const campo = await this.campoRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Campo not found`);
      }
      const updateCampo = this.campoRepository.merge(campo, updateCampoDto);

      const savedCampo = await this.campoRepository.save(updateCampo);

      return savedCampo
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try{
      const campo = await this.campoRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Campo not found`);
      }

      await this.campoRepository.remove(campo);

      return {message: 'Campo removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
