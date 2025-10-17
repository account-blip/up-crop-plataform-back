import { Module } from '@nestjs/common';
import { EstimacionesDeCosechaService } from './estimaciones-de-cosecha.service';
import { EstimacionesDeCosechaController } from './estimaciones-de-cosecha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstimacionDeCosecha } from './entities/estimacion-de-cosecha.entity';
import { User } from 'src/users/entities/user.entity';
import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Portainjerto } from 'src/portainjertos/entities/portainjerto.entity';
import { Variedad } from 'src/variedades/entities/variedad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstimacionDeCosecha, User, CampoEspecifico, Cuartel, Portainjerto, Variedad])],
  controllers: [EstimacionesDeCosechaController],
  providers: [EstimacionesDeCosechaService],
})
export class EstimacionesDeCosechaModule {}
