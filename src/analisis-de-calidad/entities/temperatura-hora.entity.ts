import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { TemperaturaDia } from './temperatura-dia.entity';

@Entity({ name: 'temperaturas_hora' })
export class TemperaturaHora {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hora: string;

  @Column()
  fecha: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  temperatura_pulpa: number;

  @ManyToOne(() => TemperaturaDia, (t) => t.temperaturasHora, {
    onDelete: 'CASCADE',
  })
  temperaturaDia: TemperaturaDia;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
