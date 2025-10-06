import { Module } from '@nestjs/common';
import { PortainjertosService } from './portainjertos.service';
import { PortainjertosController } from './portainjertos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portainjerto } from './entities/portainjerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portainjerto])],
  controllers: [PortainjertosController],
  providers: [PortainjertosService],
})
export class PortainjertosModule {}
