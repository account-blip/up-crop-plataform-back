import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUnidadesProductivaDto } from './dto/create-unidades-productiva.dto';
import { UpdateUnidadesProductivaDto } from './dto/update-unidades-productiva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadesProductiva } from './entities/unidades-productiva.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UnidadesProductivasService {
  private readonly logger = new Logger(UnidadesProductivasService.name);

  constructor(
    @InjectRepository(UnidadesProductiva)
    private readonly unidadesProductivaRepository: Repository<UnidadesProductiva>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUnidadesProductivaDto: CreateUnidadesProductivaDto) {
    try{

      const unidadproductiva = this.unidadesProductivaRepository.create(createUnidadesProductivaDto);

      const empresa = await this.empresaRepository.findOne({
        where: { id: createUnidadesProductivaDto.empresaId }
      });
  
      if (!empresa) {
        throw new NotFoundException(`Empresa not found`);
      }

      unidadproductiva.empresa = empresa;

      const savedunidadproductiva = await this.unidadesProductivaRepository.save(unidadproductiva);

      return savedunidadproductiva;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery, userId?: string): Promise<Paginated<UnidadesProductiva>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresa'],
      });
  
      const qb = this.unidadesProductivaRepository
        .createQueryBuilder('unidadesProductiva')
        .leftJoinAndSelect('unidadesProductiva.empresa', 'empresa');
  
      // ✅ Si el usuario NO es admin, aplicar filtro por empresa
      if (user?.role !== 'SUPERADMIN') {
        if (user?.empresa?.id) {
          qb.where('empresa.id = :empresaId', { empresaId: user.empresa.id });
        } else {
          qb.where('1 = 0');
        }
      }
  
      return await paginate(query, qb, {
        sortableColumns: ['id', 'nombre'],
        nullSort: 'last',
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['nombre'],
        filterableColumns: {
          nombre: [FilterOperator.ILIKE, FilterOperator.EQ],
        },
        relations: ['empresa','cuarteles'],
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  

  async findOne(id: string) {
    try {
      const unidadproductiva = await this.unidadesProductivaRepository.findOne({
        where: { id }
      });
  
      if (!unidadproductiva) {
        throw new NotFoundException(`Unidad productiva not found`);
      }
  
      return unidadproductiva;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateUnidadesProductivaDto: UpdateUnidadesProductivaDto) {
    try {
      const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
        where: { id }
      });
  
      if (!unidadesProductiva) {
        throw new NotFoundException(`Unidad productiva not found`);
      }
  
      const updateunidadesProductiva = this.unidadesProductivaRepository.merge(unidadesProductiva, updateUnidadesProductivaDto);

      if(updateUnidadesProductivaDto.empresaId !== unidadesProductiva.empresa.id){
        const empresa = await this.empresaRepository.findOne({
          where: { id: updateUnidadesProductivaDto.empresaId }
        });

        if (!empresa) {
          throw new NotFoundException(`Empresa not found`);
        }

        updateunidadesProductiva.empresa = empresa;    
      }

      const savedunidadesProductiva = await this.unidadesProductivaRepository.save(updateunidadesProductiva);

      return savedunidadesProductiva;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try{
      const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
        where: { id }
      });
  
      if (!unidadesProductiva) {
        throw new NotFoundException(`Unidades Productiva not found`);
      }

      await this.unidadesProductivaRepository.remove(unidadesProductiva);

      return {message: 'Unidad productiva removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
