import { Module } from '@nestjs/common';
import { CampoEspecificoService } from './campo-especifico.service';
import { CampoEspecificoController } from './campo-especifico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampoEspecifico } from './entities/campo-especifico.entity';
import { Campo } from 'src/campo/entities/campo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampoEspecifico, Campo])],
  controllers: [CampoEspecificoController],
  providers: [CampoEspecificoService],
})
export class CampoEspecificoModule {}
