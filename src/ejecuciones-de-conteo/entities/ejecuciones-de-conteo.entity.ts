import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export const ESTADO_TYPE = ['PRE-PODA', 'POST-PODA'] as const;
  export type EstadoType = (typeof ESTADO_TYPE)[number];
  
  @Entity({ name: 'ejecuciones_de_conteo' })
  export class EjecucionesDeConteo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('int')
    hilera: number;

    @Column('int')
    arbol: number;

    @Column('int')
    dardo: number;

    @Column('int')
    ramilla: number;
  
    @Column('enum', { enum: ESTADO_TYPE, default: ESTADO_TYPE[0] })
    estado: EstadoType;

    @Column('varchar', { length: 255 })
    foto: string;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }