import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCuarteleDto } from './dto/create-cuartele.dto';
import { UpdateCuarteleDto } from './dto/update-cuartele.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuartel } from './entities/cuartel.entity';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/users/entities/user.entity';
import { UnidadesProductiva } from 'src/unidades-productivas/entities/unidades-productiva.entity';

@Injectable()
export class CuartelesService {
  private readonly logger = new Logger(CuartelesService.name);

  constructor(
    @InjectRepository(Cuartel)
    private readonly cuartelRepository: Repository<Cuartel>,
    @InjectRepository(UnidadesProductiva)
    private readonly unidadesProductivaRepository: Repository<UnidadesProductiva>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {}
  
  async create(createCuarteleDto: CreateCuarteleDto) {
    try{

      const cuartel = this.cuartelRepository.create(createCuarteleDto);

      const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
        where: { id: createCuarteleDto.unidadProductivaId }
      });
  
      if (!unidadesProductiva) {
        throw new NotFoundException(`Unidad productiva not found`);
      }

      cuartel.unidadesProductiva = unidadesProductiva;

      const savedCuartel = await this.cuartelRepository.save(cuartel);

      return savedCuartel;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery, userId: string): Promise<Paginated<Cuartel>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresa'],
      });
  
      const qb = this.cuartelRepository
        .createQueryBuilder('cuartel')
        .leftJoinAndSelect('cuartel.unidadesProductiva', 'unidadesProductiva')
        .leftJoinAndSelect('unidadesProductiva.empresa', 'empresa');
  
      // ✅ Si el usuario NO es admin, filtrar por su campo
      if (user?.role !== 'SUPERADMIN') {
        if (user?.empresa?.id) {
          qb.where('empresa.id = :empresaId', { empresaId: user.empresa.id });
        } else {
          qb.where('1 = 0'); // no devuelve resultados
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
        relations: ['unidadesProductiva', 'unidadesProductiva.empresa'],
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  

  async findOne(id: string) {
    try {
      const cuartel = await this.cuartelRepository.findOne({
        where: { id }
      });
  
      if (!cuartel) {
        throw new NotFoundException(`Cuartel not found`);
      }
  
      return cuartel;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateCuarteleDto: UpdateCuarteleDto) {
    const cuartel = await this.cuartelRepository.findOne({
      where: { id }
    });

    if (!cuartel) {
      throw new NotFoundException(`Cuartel not found`);
    }
    const updateCuartel = this.cuartelRepository.merge(cuartel, updateCuarteleDto);

    if(updateCuarteleDto.unidadProductivaId !== cuartel.unidadesProductiva.id){
      const unidadesProductiva = await this.unidadesProductivaRepository.findOne({
        where: { id: updateCuarteleDto.unidadProductivaId }
      });

      if (!unidadesProductiva) {
        throw new NotFoundException(`Unidad productiva not found`);
      }

      updateCuartel.unidadesProductiva = unidadesProductiva;
    }

    const savedCuartel = await this.cuartelRepository.save(updateCuartel);

    return savedCuartel;
  } catch (error) {
    if (!(error instanceof NotFoundException)) {
      this.logger.error(error.message, error.stack);
    }
    throw error;
  }
  

  async remove(id: string) {
    try{
      const cuartel = await this.cuartelRepository.findOne({
        where: { id }
      });
  
      if (!cuartel) {
        throw new NotFoundException(`Cuartel not found`);
      }

      await this.cuartelRepository.remove(cuartel);

      return {message: 'Cuartel removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
