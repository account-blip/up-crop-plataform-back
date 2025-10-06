import { Module } from '@nestjs/common';
import { VariedadesService } from './variedades.service';
import { VariedadesController } from './variedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variedad } from './entities/variedad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variedad])],
  controllers: [VariedadesController],
  providers: [VariedadesService],
})
export class VariedadesModule {}
