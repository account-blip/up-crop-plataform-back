import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEstimacionDeCosechaDto } from './dto/create-estimacion-de-cosecha.dto';
import { UpdateEstimacionDeCosechaDto } from './dto/update-estimacion-de-cosecha.dto';
import { EstimacionDeCosecha } from './entities/estimacion-de-cosecha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Portainjerto } from 'src/portainjertos/entities/portainjerto.entity';
import { Variedad } from 'src/variedades/entities/variedad.entity';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UnidadesProductiva } from 'src/unidades-productivas/entities/unidades-productiva.entity';

@Injectable()
export class EstimacionesDeCosechaService {
  private readonly logger = new Logger(EstimacionesDeCosechaService.name);

  constructor(
    @InjectRepository(EstimacionDeCosecha)
    private estimacionDeCosechaRepository: Repository<EstimacionDeCosecha>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UnidadesProductiva)
    private unidadesProductivaRepository: Repository<UnidadesProductiva>,
    @InjectRepository(Cuartel)
    private cuartelRepository: Repository<Cuartel>,
    @InjectRepository(Portainjerto)
    private portainjertoRepository: Repository<Portainjerto>,
    @InjectRepository(Variedad)
    private variedadRepository: Repository<Variedad>,
  ) {}

  async create(createEstimacionDeCosechaDto: CreateEstimacionDeCosechaDto) {
    try{
      const ejecucionesDeConteo = this.estimacionDeCosechaRepository.create(createEstimacionDeCosechaDto);

      const user = await this.userRepository.findOne({
        where: { id: createEstimacionDeCosechaDto.userId }
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      ejecucionesDeConteo.user = user;

      const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
        where: { id: createEstimacionDeCosechaDto.unidadesProductivaId }
      });

      if (!unidadesProductiva) {
        throw new NotFoundException(`Unidad productiva not found`);
      }

      ejecucionesDeConteo.unidadesProductiva = unidadesProductiva;

      const cuartel = await this.cuartelRepository.findOne({
        where: { id: createEstimacionDeCosechaDto.cuartelId }
      });

      if (!cuartel) {
        throw new NotFoundException(`Cuartel not found`);
      }

      ejecucionesDeConteo.cuartel = cuartel;

      const portainjerto = await this.portainjertoRepository.findOne({
        where: { id: createEstimacionDeCosechaDto.portainjertoId }
      });

      if (!portainjerto) {
        throw new NotFoundException(`Portainjerto not found`);
      }

      ejecucionesDeConteo.portainjerto = portainjerto;

      const variedad = await this.variedadRepository.findOne({
        where: { id: createEstimacionDeCosechaDto.variedadId }
      });

      if (!variedad) {
        throw new NotFoundException(`Variedad not found`);
      }

      ejecucionesDeConteo.variedad = variedad;  

      const savedEjecucionesDeConteo = await this.estimacionDeCosechaRepository.save(ejecucionesDeConteo);

      return savedEjecucionesDeConteo;
    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery, userId: string): Promise<Paginated<EstimacionDeCosecha>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresa'],
      });
  
      const qb = this.estimacionDeCosechaRepository
        .createQueryBuilder('estimacion')
        .leftJoinAndSelect('estimacion.user', 'user')
        .leftJoinAndSelect('estimacion.campoEspecifico', 'campoEspecifico')
        .leftJoinAndSelect('estimacion.cuartel', 'cuartel')
        .leftJoinAndSelect('estimacion.portainjerto', 'portainjerto')
        .leftJoinAndSelect('estimacion.variedad', 'variedad')
        .leftJoinAndSelect('campoEspecifico.campo', 'campo');
  
      if (user?.role !== 'ADMIN') {
        if (user?.empresa?.id) {
          qb.where('campo.id = :campoId', { campoId: user.empresa.id });
        } else {
          qb.where('1 = 0');
        }
      }
      return await paginate(query, qb, {
        sortableColumns: ['id', 'hilera', 'arbol', 'dardo', 'ramilla', 'estado', 'foto'],
        searchableColumns: ['hilera', 'arbol', 'dardo', 'ramilla', 'estado'],
        defaultSortBy: [['createdAt', 'DESC']],
        nullSort: 'last',
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  

  async findOne(id: string) {
    try {
      const ejecucionesDeConteo = await this.estimacionDeCosechaRepository.findOne({
        where: { id },
        relations: ['user', 'campoEspecifico', 'cuartel', 'portainjerto', 'variedad'],
      });
      if (!ejecucionesDeConteo) {
        throw new NotFoundException(`Ejecuciones de Conteo not found`);
      }
      return ejecucionesDeConteo;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async update(id: string, updateEstimacionDeCosechaDto: UpdateEstimacionDeCosechaDto) {
    try {
      const ejecucionesDeConteo = await this.estimacionDeCosechaRepository.findOne({
        where: { id },
        relations: ['user', 'campoEspecifico', 'cuartel', 'portainjerto', 'variedad'],
      });
      if (!ejecucionesDeConteo) {
        throw new NotFoundException(`Ejecuciones de Conteo not found`);
      }
      const updatedEjecucionesDeConteo = this.estimacionDeCosechaRepository.merge(ejecucionesDeConteo, updateEstimacionDeCosechaDto);

      if(updateEstimacionDeCosechaDto.userId !== ejecucionesDeConteo.user.id){
        const user = await this.userRepository.findOne({
          where: { id: updateEstimacionDeCosechaDto.userId }
        });
        if (!user) {
          throw new NotFoundException(`User not found`);
        }
        updatedEjecucionesDeConteo.user = user;
      }

      if(updateEstimacionDeCosechaDto.unidadesProductivaId !== ejecucionesDeConteo.unidadesProductiva.id){
        const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
          where: { id: updateEstimacionDeCosechaDto.unidadesProductivaId }
        });
        if (!unidadesProductiva) {
          throw new NotFoundException(`Unidades productiva not found`);
        }
        updatedEjecucionesDeConteo.unidadesProductiva = unidadesProductiva;
      }

      if(updateEstimacionDeCosechaDto.cuartelId !== ejecucionesDeConteo.cuartel.id){
        const cuartel = await this.cuartelRepository.findOne({
          where: { id: updateEstimacionDeCosechaDto.cuartelId }
        });
        if (!cuartel) {
          throw new NotFoundException(`Cuartel not found`);
        }
        updatedEjecucionesDeConteo.cuartel = cuartel;
      }

      if(updateEstimacionDeCosechaDto.portainjertoId !== ejecucionesDeConteo.portainjerto.id){
        const portainjerto = await this.portainjertoRepository.findOne({
          where: { id: updateEstimacionDeCosechaDto.portainjertoId }
        });
        if (!portainjerto) {
          throw new NotFoundException(`Portainjerto not found`);
        }
        updatedEjecucionesDeConteo.portainjerto = portainjerto;
      }

      if(updateEstimacionDeCosechaDto.variedadId !== ejecucionesDeConteo.variedad.id){
        const variedad = await this.variedadRepository.findOne({
          where: { id: updateEstimacionDeCosechaDto.variedadId }
        });
        if (!variedad) {
          throw new NotFoundException(`Variedad not found`);
        }
        updatedEjecucionesDeConteo.variedad = variedad;
      } 
      const savedEjecucionesDeConteo = await this.estimacionDeCosechaRepository.save(updatedEjecucionesDeConteo);

      return savedEjecucionesDeConteo;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async remove(id: string) {
    try {
      const ejecucionesDeConteo = await this.estimacionDeCosechaRepository.findOne({
        where: { id },
        relations: ['user', 'campoEspecifico', 'cuartel', 'portainjerto', 'variedad'],
      });
      if (!ejecucionesDeConteo) {
        throw new NotFoundException(`Ejecuciones de Conteo not found`);
      }
      await this.estimacionDeCosechaRepository.remove(ejecucionesDeConteo);
      return { message: 'Ejecuciones de Conteo removed successfully' };
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
