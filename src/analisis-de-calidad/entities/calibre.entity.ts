import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  import { AnalisisCalidad } from './analisis-de-calidad.entity';
  
  @Entity({ name: 'calibres' })
  export class Calibre {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    fecha: Date;
  
    @Column()
    calibre: string;
  
    @Column('int')
    cantidad: number;
  
    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    porcentaje: number;
  
    @ManyToOne(() => AnalisisCalidad, (a) => a.calibres, {
      onDelete: 'CASCADE',
    })
    analisisDeCalidad: AnalisisCalidad;

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  