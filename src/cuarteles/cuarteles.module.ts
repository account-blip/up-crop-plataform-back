import { Module } from '@nestjs/common';
import { CuartelesService } from './cuarteles.service';
import { CuartelesController } from './cuarteles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuartel } from './entities/cuartel.entity';
import { User } from 'src/users/entities/user.entity';
import { UnidadesProductiva } from 'src/unidades-productivas/entities/unidades-productiva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuartel, UnidadesProductiva, User])],
  controllers: [CuartelesController],
  providers: [CuartelesService],
})
export class CuartelesModule {}
