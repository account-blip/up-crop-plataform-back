import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig, DatabaseConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EjecucionDeConteoModule } from './ejecucion-de-conteo/ejecucion-de-conteo.module';
import { CampoModule } from './campo/campo.module';
import { CampoEspecificoModule } from './campo-especifico/campo-especifico.module';

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
    EjecucionDeConteoModule,
    CampoModule,
    CampoEspecificoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
