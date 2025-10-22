import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class EmpresaService {
  private readonly logger = new Logger(EmpresaService.name);

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    try{

      const campo = this.empresaRepository.create(createEmpresaDto);

      const savedCampo = await this.empresaRepository.save(campo);

      return savedCampo;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Empresa>> {
    try {
      return await paginate(query, this.empresaRepository, {
        sortableColumns: ['id', 'nombre'],
        nullSort: 'last',
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['nombre'],
        filterableColumns: {
          nombre: [FilterOperator.ILIKE, FilterOperator.EQ],
        },
        relations:['unidadesProductiva', 'unidadesProductiva.cuarteles']
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findOne(id: string) {
    try {
      const campo = await this.empresaRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Empresa not found`);
      }
  
      return campo;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      const campo = await this.empresaRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Empresa not found`);
      }
      const updateCampo = this.empresaRepository.merge(campo, updateEmpresaDto);

      const savedCampo = await this.empresaRepository.save(updateCampo);

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
      const campo = await this.empresaRepository.findOne({
        where: { id }
      });
  
      if (!campo) {
        throw new NotFoundException(`Empresa not found`);
      }

      await this.empresaRepository.remove(campo);

      return {message: 'Empresa removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
