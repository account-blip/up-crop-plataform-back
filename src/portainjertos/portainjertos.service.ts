import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePortainjertoDto } from './dto/create-portainjerto.dto';
import { UpdatePortainjertoDto } from './dto/update-portainjerto.dto';
import { Repository } from 'typeorm';
import { Portainjerto } from './entities/portainjerto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
@Injectable()
export class PortainjertosService {
  private readonly logger = new Logger(PortainjertosService.name);

  constructor(
    @InjectRepository(Portainjerto)
    private readonly portainjertoRepository: Repository<Portainjerto>,
  ) {}

  async create(createPortainjertoDto: CreatePortainjertoDto) {
    try{

      const portainjerto = this.portainjertoRepository.create(createPortainjertoDto);

      const savedPortainjerto = await this.portainjertoRepository.save(portainjerto);

      return savedPortainjerto;

    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Portainjerto>> {
    try {
      return await paginate(query, this.portainjertoRepository, {
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
      const portainjerto = await this.portainjertoRepository.findOne({
        where: { id }
      });

      if (!portainjerto) {
        throw new NotFoundException(`Portainjerto not found`);
      }

      return portainjerto;
    }catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async update(id: string, updatePortainjertoDto: UpdatePortainjertoDto) {
    try {
      const portainjerto = await this.portainjertoRepository.findOne({
        where: { id }
      });
  
      if (!portainjerto) {
        throw new NotFoundException(`Portainjerto not found`);
      }
      const updatePortainjerto = this.portainjertoRepository.merge(portainjerto, updatePortainjertoDto);

      const savedPortainjerto = await this.portainjertoRepository.save(updatePortainjerto);

      return savedPortainjerto;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }


  async remove(id: string) {
    try{
      const portainjerto = await this.portainjertoRepository.findOne({
        where: { id }
      });
  
      if (!portainjerto) {
        throw new NotFoundException(`Portainjerto not found`);
      }

      await this.portainjertoRepository.remove(portainjerto);

      return {message: 'Portainjerto removed successfully'}
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
