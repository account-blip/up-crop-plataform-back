import { Module } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoController } from './campo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campo } from './entities/campo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campo])],
  controllers: [CampoController],
  providers: [CampoService],
})
export class CampoModule {}
