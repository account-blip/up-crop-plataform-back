import { Module } from '@nestjs/common';
import { CuartelesService } from './cuarteles.service';
import { CuartelesController } from './cuarteles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuartel } from './entities/cuartel.entity';
import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuartel,CampoEspecifico])],
  controllers: [CuartelesController],
  providers: [CuartelesService],
})
export class CuartelesModule {}
