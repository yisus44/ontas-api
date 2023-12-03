import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SmartWatchDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Smartphone,
    (smartphone: Smartphone) => smartphone.smartwatches,
    {
      eager: false,
    },
  )
  smartphone: Smartphone;

  @Column()
  smartphoneId: number;

  @Column({ nullable: true })
  childName: string;

  @Column({ nullable: true, type: 'float' })
  currentLat: number;

  @Column({ nullable: true, type: 'float' })
  currentLong: number;

  @Column({ nullable: true, type: 'float' })
  referenceLat: number;

  @Column({ nullable: true, type: 'float' })
  referenceLong: number;

  @Column({ nullable: true })
  maxDistanceRadio: number;

  @Column()
  token: string;

  @Column({ default: false })
  active: boolean;
}
