import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Portainjerto } from 'src/portainjertos/entities/portainjerto.entity';
import { User } from 'src/users/entities/user.entity';
import { Variedad } from 'src/variedades/entities/variedad.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export const ESTADO_TYPE = ['PRE-PODA', 'POST-PODA'] as const;
  export type EstadoType = (typeof ESTADO_TYPE)[number];
  
  @Entity({ name: 'estimacion_de_cosecha' })
  export class EstimacionDeCosecha {
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

    @ManyToOne(() => User, (user) => user.estimacionesDeCosecha, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => CampoEspecifico, (campoEspecifico) => campoEspecifico.estimacionesDeCosecha, {onDelete: 'CASCADE'})
    campoEspecifico: CampoEspecifico;

    @ManyToOne(() => Cuartel, (cuartel) => cuartel.estimacionesDeCosecha, {onDelete: 'CASCADE'})
    cuartel: Cuartel;

    @ManyToOne(() => Portainjerto, (portainjerto) => portainjerto.estimacionesDeCosecha, {onDelete: 'CASCADE'})
    portainjerto: Portainjerto;

    @ManyToOne(() => Variedad, (variedad) => variedad.estimacionesDeCosecha, {onDelete: 'CASCADE'})
    variedad: Variedad;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }