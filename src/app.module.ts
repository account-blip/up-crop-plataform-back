import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig, DatabaseConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CampoModule } from './campo/campo.module';
import { CampoEspecificoModule } from './campo-especifico/campo-especifico.module';
import { EstimacionesDeCosechaModule } from './estimaciones-de-cosecha/estimaciones-de-cosecha.module';
import { CuartelesModule } from './cuarteles/cuarteles.module';
import { VariedadesModule } from './variedades/variedades.module';
import { PortainjertosModule } from './portainjertos/portainjertos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CampoModule,
    CampoEspecificoModule,
    EstimacionesDeCosechaModule,
    CuartelesModule,
    VariedadesModule,
    PortainjertosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
