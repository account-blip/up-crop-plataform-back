import { Module } from '@nestjs/common';
import { EjecucionDeConteoService } from './ejecucion-de-conteo.service';
import { EjecucionDeConteoController } from './ejecucion-de-conteo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjecucionDeConteo } from './entities/ejecucion-de-conteo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EjecucionDeConteo])],
  controllers: [EjecucionDeConteoController],
  providers: [EjecucionDeConteoService],
})
export class EjecucionDeConteoModule {}
