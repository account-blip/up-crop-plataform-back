import { Module } from '@nestjs/common';
import { UnidadesProductivasService } from './unidades-productivas.service';
import { UnidadesProductivasController } from './unidades-productivas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { User } from 'src/users/entities/user.entity';
import { UnidadesProductiva } from './entities/unidades-productiva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadesProductiva, Empresa, User])],
  controllers: [UnidadesProductivasController],
  providers: [UnidadesProductivasService],
})
export class UnidadesProductivasModule {}
