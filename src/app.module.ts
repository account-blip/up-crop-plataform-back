import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig, DatabaseConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmpresaModule } from './empresas/empresas.module';
import { EstimacionesDeCosechaModule } from './estimaciones-de-cosecha/estimaciones-de-cosecha.module';
import { CuartelesModule } from './cuarteles/cuarteles.module';
import { VariedadesModule } from './variedades/variedades.module';
import { PortainjertosModule } from './portainjertos/portainjertos.module';
import { UnidadesProductivasModule } from './unidades-productivas/unidades-productivas.module';
import { AnalisisDeCalidadModule } from './analisis-de-calidad/analisis-de-calidad.module';

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
    EmpresaModule,
    UnidadesProductivasModule,
    EstimacionesDeCosechaModule,
    CuartelesModule,
    VariedadesModule,
    PortainjertosModule,
    UnidadesProductivasModule,
    AnalisisDeCalidadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
