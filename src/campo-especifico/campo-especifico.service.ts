import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCampoEspecificoDto } from './dto/create-campo-especifico.dto';
import { UpdateCampoEspecificoDto } from './dto/update-campo-especifico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoEspecifico } from './entities/campo-especifico.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Campo } from 'src/campo/entities/campo.entity';

@Injectable()
export class CampoEspecificoService {
  private readonly logger = new Logger(CampoEspecificoService.name);

  constructor(
    @InjectRepository(CampoEspecifico)
    private readonly campoEspecificoRepository: Repository<CampoEspecifico>,
    @InjectRepository(Campo)
    private readonly campoRepository: Repository<Campo>,
  ) {}

  async create(createCampoEspecificoDto: CreateCampoEspecificoDto) {
    try{

      const campoEspecifico = this.campoEspecificoRepository.create(createCampoEspecificoDto);

      const campo = await this.campoRepository.findOne({
        where: { id: createCampoEspecificoDto.campoId }
      });
  
      if (!campo) {
        throw new NotFoundException(`Campo not found`);
      }

      campoEspecifico.campo = campo;

      const savedCampoEspecifico = await this.campoEspecificoRepository.save(campoEspecifico);

      return savedCampoEspecifico;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<CampoEspecifico>> {
    try {
      return await paginate(query, this.campoEspecificoRepository, {
        sortableColumns: ['id', 'nombre'],
        nullSort: 'last',
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['nombre'],
        filterableColumns: {
          nombre: [FilterOperator.ILIKE, FilterOperator.EQ],
        },
        relations: ['campo'],
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findOne(id: string) {
    try {
      const campoEspecifico = await this.campoEspecificoRepository.findOne({
        where: { id }
      });
  
      if (!campoEspecifico) {
        throw new NotFoundException(`Campo Especifico not found`);
      }
  
      return campoEspecifico;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateCampoEspecificoDto: UpdateCampoEspecificoDto) {
    try {
      const campoEspecifico = await this.campoEspecificoRepository.findOne({
        where: { id }
      });
  
      if (!campoEspecifico) {
        throw new NotFoundException(`Campo Especifico not found`);
      }
  
      const updateCampoEspecifico = this.campoEspecificoRepository.merge(campoEspecifico, updateCampoEspecificoDto);

      if(updateCampoEspecificoDto.campoId !== campoEspecifico.campo.id){
        const campo = await this.campoRepository.findOne({
          where: { id: updateCampoEspecificoDto.campoId }
        });

        if (!campo) {
          throw new NotFoundException(`Campo not found`);
        }

        updateCampoEspecifico.campo = campo;    
      }
      
      const savedCampoEspecifico = await this.campoEspecificoRepository.save(updateCampoEspecifico);

      return savedCampoEspecifico;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try{
      const campoEspecifico = await this.campoEspecificoRepository.findOne({
        where: { id }
      });
  
      if (!campoEspecifico) {
        throw new NotFoundException(`Campo Especifico not found`);
      }

      await this.campoEspecificoRepository.remove(campoEspecifico);

      return {message: 'Campo Especifico removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
