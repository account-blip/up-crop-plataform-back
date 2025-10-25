import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FilterOperator, paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import { AnalisisCalidad } from './entities/analisis-de-calidad.entity'
import { CreateAnalisisDeCalidadDto } from './dto/create-analisis-de-calidad.dto';
import { UpdateAnalisisDeCalidadDto } from './dto/update-analisis-de-calidad.dto';

import { Variedad } from '../variedades/entities/variedad.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Calibre } from './entities/calibre.entity';
import { Color } from './entities/color.entity';
import { ControlCalidad } from './entities/control-calidad.entity';
import { TemperaturaDia } from './entities/temperatura-dia.entity';
import { TemperaturaHora } from './entities/temperatura-hora.entity';
import { User } from 'src/users/entities/user.entity';
import { Defecto } from './entities/defecto.entity';
import { ControlCalidadDefecto } from './entities/control-calidad-defecto.entity';

@Injectable()
export class AnalisisDeCalidadService {
  private readonly logger = new Logger(AnalisisDeCalidadService.name);

  constructor(
    @InjectRepository(AnalisisCalidad)
    private readonly analisisRepository: Repository<AnalisisCalidad>,

    @InjectRepository(Calibre)
    private readonly calibreRepository: Repository<Calibre>,

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    @InjectRepository(ControlCalidad)
    private readonly controlCalidadRepository: Repository<ControlCalidad>,

    @InjectRepository(TemperaturaDia)
    private readonly temperaturaDiaRepository: Repository<TemperaturaDia>,

    @InjectRepository(TemperaturaHora)
    private readonly temperaturaHoraRepository: Repository<TemperaturaHora>,

    @InjectRepository(Variedad)
    private readonly variedadRepository: Repository<Variedad>,

    @InjectRepository(Cuartel)
    private readonly cuartelRepository: Repository<Cuartel>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Defecto)
    private readonly defectoRepository: Repository<Defecto>,

    @InjectRepository(ControlCalidadDefecto)
    private readonly controlCalidadDefectoRepository: Repository<ControlCalidadDefecto>,
  ) {}

  // =========================
  // 🟢 CREATE
  // =========================
  async create(dto: CreateAnalisisDeCalidadDto) {
    try {
      // 🧭 1. Buscar relaciones obligatorias
      const variedad = await this.variedadRepository.findOne({
        where: { id: dto.variedadId },
      });
      if (!variedad) throw new NotFoundException('Variedad not found');
  
      const cuartel = await this.cuartelRepository.findOne({
        where: { id: dto.cuartelId },
      });
      if (!cuartel) throw new NotFoundException('Cuartel not found');
  
      // 🧪 2. Crear análisis base
      const analisis = this.analisisRepository.create({
        fecha: dto.fecha,
        temperaturaBins: dto.temperaturaBins,
        brix: dto.brix,
        cuartel,
        variedad,
      });
      const savedAnalisis = await this.analisisRepository.save(analisis);
  
      // ===============================
      // 🧭 3. Calibres
      // ===============================
      if (dto.calibres && dto.calibres.length > 0) {
        const calibres = dto.calibres.map((cal) =>
          this.calibreRepository.create({ ...cal, analisisDeCalidad: savedAnalisis }),
        );
        await this.calibreRepository.save(calibres);
      }
  
      // ===============================
      // 🧭 4. Colores
      // ===============================
      if (dto.colores && dto.colores.length > 0) {
        const colores = dto.colores.map((c) =>
          this.colorRepository.create({ ...c, analisisDeCalidad: savedAnalisis }),
        );
        await this.colorRepository.save(colores);
      }
  
      // ===============================
      // 🧭 5. Controles de Calidad
      // ===============================
      if (dto.controlesCalidad && dto.controlesCalidad.length > 0) {
        for (const ctrl of dto.controlesCalidad) {
          // 👉 5.1 Crear la entidad base de control
          const nuevoControl = this.controlCalidadRepository.create({
            tipo: ctrl.tipo,
            analisisDeCalidad: savedAnalisis,
          });
  
          // 👉 5.2 Guardar primero el control para obtener su ID
          const savedControl = await this.controlCalidadRepository.save(nuevoControl);
  
          // 👉 5.3 Si hay defectos seleccionados, crear registros pivote
          if (ctrl.defectos && ctrl.defectos.length > 0) {
            for (const def of ctrl.defectos) {
              const defectoEntity = await this.defectoRepository.findOneBy({ id: def.id });
              if (!defectoEntity) {
                throw new NotFoundException(`Defecto con ID ${def.id} no encontrado`);
              }
  
              // 👉 Crear la relación pivote con cantidad
              const pivote = this.controlCalidadDefectoRepository.create({
                control: savedControl,
                defecto: defectoEntity,
                porcentaje: def.porcentaje ?? 0, // cantidad opcional
              });
  
              await this.controlCalidadDefectoRepository.save(pivote);
            }
          }
        }
      }
  
      return savedAnalisis;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  
  // =========================
  // 🟡 FIND ALL (paginado)
  // =========================
  async findAll(
    query: PaginateQuery,
    userId: string,
  ): Promise<Paginated<AnalisisCalidad>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresa'],
      });
  
      const qb = this.analisisRepository
      .createQueryBuilder('analisis')
      .leftJoinAndSelect('analisis.variedad', 'variedad')
      .leftJoinAndSelect('analisis.cuartel', 'cuartel')
      .leftJoinAndSelect('cuartel.unidadesProductiva', 'unidadesProductiva')
      .leftJoinAndSelect('unidadesProductiva.empresa', 'empresa')
      .leftJoinAndSelect('analisis.calibres', 'calibres')
      .leftJoinAndSelect('analisis.colores', 'colores')
      .leftJoinAndSelect('analisis.controlesCalidad', 'controlesCalidad')
      // 👇 JOIN correcto a la tabla pivote
      .leftJoinAndSelect('controlesCalidad.defectosAsignados', 'defectosAsignados')
      // 👇 JOIN adicional a la tabla de defectos
      .leftJoinAndSelect('defectosAsignados.defecto', 'defecto');
    
        
  
      // 🧭 Filtrado por empresa si no es SUPERADMIN
      if (user?.role !== 'SUPERADMIN') {
        if (user?.empresa?.id) {
          qb.where('empresa.id = :empresaId', { empresaId: user.empresa.id });
        } else {
          qb.where('1 = 0');
        }
      }
  
      const result = await paginate(query, qb, {
        sortableColumns: ['fecha', 'createdAt'],
        defaultSortBy: [['fecha', 'DESC']],
        searchableColumns: ['variedad.nombre', 'cuartel.nombre'],
        filterableColumns: { fecha: true },
      });
      
      console.dir(result.data[0]?.controlesCalidad, { depth: null });
      return result;
      
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
  
  // =========================
  // 🟠 FIND ONE
  // =========================
  async findOne(id: string) {
    try {
      const analisis = await this.analisisRepository.findOne({
        where: { id },
        relations: [
          'variedad',
          'cuartel',
          'calibres',
          'colores',
          'controlesCalidad',
          'temperaturasDia',
          'temperaturasDia.temperaturasHora',
        ],
      });

      if (!analisis) throw new NotFoundException(`Análisis not found`);

      return analisis;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }

    // =========================
  // 🟠 UPDATE
  // =========================
  async update(id: string, dto: UpdateAnalisisDeCalidadDto) {
    try {
      const analisis = await this.analisisRepository.findOne({
        where: { id },
        relations: [
          'calibres',
          'colores',
          'controlesCalidad',
          'temperaturasDia',
          'temperaturasDia.temperaturasHora',
        ],
      });

      if (!analisis) throw new NotFoundException('Análisis no encontrado');

      // 🧭 actualizar datos base
      if (dto.variedadId) {
        const variedad = await this.variedadRepository.findOne({ where: { id: dto.variedadId } });
        if (!variedad) throw new NotFoundException('Variedad no encontrada');
        analisis.variedad = variedad;
      }

      if (dto.cuartelId) {
        const cuartel = await this.cuartelRepository.findOne({ where: { id: dto.cuartelId } });
        if (!cuartel) throw new NotFoundException('Cuartel no encontrado');
        analisis.cuartel = cuartel;
      }

      analisis.fecha = dto.fecha ?? analisis.fecha;
      analisis.brix = dto.brix ?? analisis.brix;
      analisis.temperaturaBins = dto.temperaturaBins ?? analisis.temperaturaBins;

      await this.analisisRepository.save(analisis);

      // =========================
      // 🧭 Calibres
      // =========================
      if (dto.calibres) {
        await this.calibreRepository.delete({ analisisDeCalidad: { id } });
        const nuevosCalibres = dto.calibres.map((c) =>
          this.calibreRepository.create({ ...c, analisisDeCalidad: analisis }),
        );
        await this.calibreRepository.save(nuevosCalibres);
      }

      // =========================
      // 🧭 Colores
      // =========================
      if (dto.colores) {
        await this.colorRepository.delete({ analisisDeCalidad: { id } });
        const nuevosColores = dto.colores.map((c) =>
          this.colorRepository.create({ ...c, analisisDeCalidad: analisis }),
        );
        await this.colorRepository.save(nuevosColores);
      }

      // =========================
      // 🧭 Controles de calidad
      // =========================
      if (dto.controlesCalidad) {
        await this.controlCalidadRepository.delete({ analisisDeCalidad: { id } });
        const nuevosControles = dto.controlesCalidad.map((ctrl) =>
          this.controlCalidadRepository.create({ ...ctrl, analisisDeCalidad: analisis }),
        );
        await this.controlCalidadRepository.save(nuevosControles);
      }

      return {
        message: 'Análisis de calidad actualizado correctamente',
        id: analisis.id,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  // =========================
  // 🔴 REMOVE
  // =========================
  async remove(id: string) {
    try {
      const analisis = await this.analisisRepository.findOne({ where: { id } });

      if (!analisis) throw new NotFoundException(`Análisis not found`);

      await this.analisisRepository.remove(analisis);
      return { message: 'Análisis eliminado correctamente' };
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
