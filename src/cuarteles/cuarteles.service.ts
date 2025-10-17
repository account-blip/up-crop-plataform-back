import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCuarteleDto } from './dto/create-cuartele.dto';
import { UpdateCuarteleDto } from './dto/update-cuartele.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuartel } from './entities/cuartel.entity';
import { Repository } from 'typeorm';
import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CuartelesService {
  private readonly logger = new Logger(CuartelesService.name);

  constructor(
    @InjectRepository(Cuartel)
    private readonly cuartelRepository: Repository<Cuartel>,
    @InjectRepository(CampoEspecifico)
    private readonly campoEspecificoRepository: Repository<CampoEspecifico>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {}
  
  async create(createCuarteleDto: CreateCuarteleDto) {
    try{

      const cuartel = this.cuartelRepository.create(createCuarteleDto);

      const campoEspecifico = await this.campoEspecificoRepository.findOne({
        where: { id: createCuarteleDto.campoEspecificoId }
      });
  
      if (!campoEspecifico) {
        throw new NotFoundException(`Campo not found`);
      }

      cuartel.campoEspecifico = campoEspecifico;

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
        relations: ['campo'],
      });
  
      const qb = this.cuartelRepository
        .createQueryBuilder('cuartel')
        .leftJoinAndSelect('cuartel.campoEspecifico', 'campoEspecifico')
        .leftJoinAndSelect('campoEspecifico.campo', 'campo');
  
      // ✅ Si el usuario NO es admin, filtrar por su campo
      if (user?.role !== 'ADMIN') {
        if (user?.campo?.id) {
          qb.where('campo.id = :campoId', { campoId: user.campo.id });
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
        relations: ['campoEspecifico', 'campoEspecifico.campo'],
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

    if(updateCuarteleDto.campoEspecificoId !== cuartel.campoEspecifico.id){
      const campoEspecifico = await this.campoEspecificoRepository.findOne({
        where: { id: updateCuarteleDto.campoEspecificoId }
      });

      if (!campoEspecifico) {
        throw new NotFoundException(`Campo Especifico not found`);
      }

      updateCuartel.campoEspecifico = campoEspecifico;
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
