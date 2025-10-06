import { Module } from '@nestjs/common';
import { EjecucionesDeConteoService } from './ejecuciones-de-conteo.service';
import { EjecucionesDeConteoController } from './ejecuciones-de-conteo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjecucionesDeConteo } from './entities/ejecuciones-de-conteo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EjecucionesDeConteo])],
  controllers: [EjecucionesDeConteoController],
  providers: [EjecucionesDeConteoService],
})
export class EjecucionesDeConteoModule {}
