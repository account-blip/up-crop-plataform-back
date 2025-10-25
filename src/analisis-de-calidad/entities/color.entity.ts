import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  import { AnalisisCalidad } from './analisis-de-calidad.entity'
  
  @Entity({ name: 'colores' })
  export class Color {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    fecha: Date;
  
    @Column()
    color: string;
  
    @Column('int')
    cantidad: number;
  
    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    porcentaje: number;
  
    @ManyToOne(() => AnalisisCalidad, (a) => a.colores, {
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
  