import { SmartWatchDevice } from 'src/smartwatch/entities/smartwatch.entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Smartphone {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  currentCode?: string;

  @OneToMany(
    () => SmartWatchDevice,
    (smartwatch: SmartWatchDevice) => smartwatch.smartphone,
    { onDelete: 'CASCADE' },
  )
  smartwatches: SmartWatchDevice[];
}
