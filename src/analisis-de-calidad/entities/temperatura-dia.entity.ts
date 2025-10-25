import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  import { AnalisisCalidad } from './analisis-de-calidad.entity'
  import { TemperaturaHora } from './temperatura-hora.entity';
  
  @Entity({ name: 'temperaturas_dia' })
  export class TemperaturaDia {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    fecha: Date;
  
    @Column('decimal', { precision: 5, scale: 2 })
    temperatura: number;
  
    @ManyToOne(() => AnalisisCalidad, (a) => a.temperaturasDia, {
      onDelete: 'CASCADE',
    })
    analisisDeCalidad: AnalisisCalidad;
  
    @OneToMany(() => TemperaturaHora, (h) => h.temperaturaDia)
    temperaturasHora: TemperaturaHora[];

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  