import { Module } from '@nestjs/common';
import { AnalisisDeCalidadService } from './analisis-de-calidad.service';
import { AnalisisDeCalidadController } from './analisis-de-calidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalisisCalidad } from './entities/analisis-de-calidad.entity';
import { User } from 'src/users/entities/user.entity';
import { Calibre } from './entities/calibre.entity';
import { Color } from './entities/color.entity';
import { ControlCalidad } from './entities/control-calidad.entity';
import { Defecto } from './entities/defecto.entity';
import { TemperaturaDia } from './entities/temperatura-dia.entity';
import { TemperaturaHora } from './entities/temperatura-hora.entity';
import { DefectosController } from './defecto.controller';
import { DefectosService } from './defectos.service';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Variedad } from 'src/variedades/entities/variedad.entity';
import { ControlCalidadDefecto } from './entities/control-calidad-defecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalisisCalidad, User, Calibre, Color, ControlCalidad, Defecto, TemperaturaDia, TemperaturaHora, Cuartel, Variedad, ControlCalidadDefecto])],
  controllers: [AnalisisDeCalidadController, DefectosController],
  providers: [AnalisisDeCalidadService, DefectosService],
})
export class AnalisisDeCalidadModule {}
