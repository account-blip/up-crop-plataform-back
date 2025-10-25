import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import { User } from 'src/users/entities/user.entity';
import { Defecto } from './entities/defecto.entity';
import { CreateDefectoDto } from './dto/create-defecto.dto';
import { UpdateDefectoDto } from './dto/update-defecto.dto';

@Injectable()
export class DefectosService {
  private readonly logger = new Logger(DefectosService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Defecto)
    private readonly defectoRepository: Repository<Defecto>,
  ) {}

  async create(createDefectoDto: CreateDefectoDto) {
    try{

      const defecto = this.defectoRepository.create(createDefectoDto);

      const savedDefecto = await this.defectoRepository.save(defecto);

      return savedDefecto;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery, userId: string): Promise<Paginated<Defecto>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresa'],
      });
  
      const qb = this.defectoRepository
        .createQueryBuilder('defecto')
        // 👇 Tabla pivote (ControlCalidadDefecto)
        .leftJoinAndSelect('defecto.usosEnControles', 'usosEnControles')
        // 👇 Entidad ControlCalidad
        .leftJoinAndSelect('usosEnControles.control', 'control')
        // 👇 Relación con AnalisisDeCalidad
        .leftJoinAndSelect('control.analisisDeCalidad', 'analisisDeCalidad')
        // 👇 Resto de relaciones
        .leftJoinAndSelect('analisisDeCalidad.variedad', 'variedad')
        .leftJoinAndSelect('analisisDeCalidad.cuartel', 'cuartel')
        .leftJoinAndSelect('cuartel.unidadesProductiva', 'unidadesProductiva')
        .leftJoinAndSelect('unidadesProductiva.empresa', 'empresa');
  
      // 🧭 Filtrado por empresa si no es SUPERADMIN
      if (user?.role !== 'SUPERADMIN') {
        if (user?.empresa?.id) {
          qb.where('empresa.id = :empresaId', { empresaId: user.empresa.id });
        } else {
          qb.where('1 = 0');
        }
      }
  
      return await paginate(query, qb, {
        sortableColumns: ['id', 'nombre'],
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['nombre'],
        filterableColumns: {
          nombre: [FilterOperator.ILIKE, FilterOperator.EQ],
        },
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  
  async findOne(id: string) {
    try {
      const defecto = await this.defectoRepository.findOne({
        where: { id }
      });
  
      if (!defecto) {
        throw new NotFoundException(`defecto not found`);
      }
  
      return defecto;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, UpdateDefectoDto: UpdateDefectoDto) {
    const defecto = await this.defectoRepository.findOne({
      where: { id }
    });

    if (!defecto) {
      throw new NotFoundException(`defecto not found`);
    }
    const updateDefecto = this.defectoRepository.merge(defecto, UpdateDefectoDto);

    const savedDefecto = await this.defectoRepository.save(updateDefecto);

    return savedDefecto;
  } catch (error) {
    if (!(error instanceof NotFoundException)) {
      this.logger.error(error.message, error.stack);
    }
    throw error;
  }
  

  async remove(id: string) {
    try{
      const defecto = await this.defectoRepository.findOne({
        where: { id }
      });
  
      if (!defecto) {
        throw new NotFoundException(`defecto not found`);
      }

      await this.defectoRepository.remove(defecto);

      return {message: 'defecto removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
