import { Module } from '@nestjs/common';
import { CuartelesService } from './cuarteles.service';
import { CuartelesController } from './cuarteles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuartel } from './entities/cuartel.entity';
import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuartel, CampoEspecifico, User])],
  controllers: [CuartelesController],
  providers: [CuartelesService],
})
export class CuartelesModule {}
