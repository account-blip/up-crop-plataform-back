import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinTable,
    ManyToMany,
  } from 'typeorm';
  import { Defecto } from './defecto.entity';
  import { AnalisisCalidad } from './analisis-de-calidad.entity';
import { ControlCalidadDefecto } from './control-calidad-defecto.entity';
  
  export const TIPO_CONTROL = ['CAMPO','DESPACHO'] as const
  export type TipoControl = (typeof TIPO_CONTROL)[number];


  @Entity({ name: 'controles_calidad' })
  export class ControlCalidad {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    fecha: Date;

    @Column('enum', { enum: TIPO_CONTROL, default: TIPO_CONTROL[0] })
    tipo: TipoControl;
  
    @ManyToOne(() => AnalisisCalidad, (analisis) => analisis.controlesCalidad, {
      onDelete: 'CASCADE',
    })
    analisisDeCalidad: AnalisisCalidad;
  
    @OneToMany(() => ControlCalidadDefecto, (ccd) => ccd.control, {
      eager: false,
    })
    defectosAsignados: ControlCalidadDefecto[]

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  