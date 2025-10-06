import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'campo' })
  export class Campo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @OneToMany(() => User, (user) => user.campo, { cascade: true })
    users: User[]

    @OneToMany(() => CampoEspecifico, (campoEspecifico) => campoEspecifico.campo, { cascade: true })
    campoEspecificos: CampoEspecifico[]
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
