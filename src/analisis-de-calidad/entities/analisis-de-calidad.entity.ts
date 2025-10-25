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
  import { ControlCalidad } from './control-calidad.entity';
  import { TemperaturaDia } from './temperatura-dia.entity';
  import { Color } from './color.entity';
  import { Calibre } from './calibre.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
import { Variedad } from 'src/variedades/entities/variedad.entity';
  
  @Entity({ name: 'analisis_calidad' })
  export class AnalisisCalidad {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    fecha: Date;
  
    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    temperaturaBins: number;
  
    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    brix: number;
  
    @ManyToOne(() => Cuartel, { nullable: false })
    cuartel: Cuartel;
  
    @ManyToOne(() => Variedad, { nullable: false })
    variedad: Variedad;
  
    @OneToMany(() => ControlCalidad, (control) => control.analisisDeCalidad)
    controlesCalidad: ControlCalidad[];
  
    @OneToMany(() => TemperaturaDia, (temp) => temp.analisisDeCalidad)
    temperaturasDia: TemperaturaDia[];
  
    @OneToMany(() => Color, (color) => color.analisisDeCalidad)
    colores: Color[];
  
    @OneToMany(() => Calibre, (calibre) => calibre.analisisDeCalidad)
    calibres: Calibre[];

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  