import { Injectable } from '@nestjs/common';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartWatchDevice } from './entities/smartwatch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmartwatchService {
  constructor(
    @InjectRepository(SmartWatchDevice)
    private smartwatchRepository: Repository<SmartWatchDevice>,
  ) {}

  async findAll(): Promise<SmartWatchDevice[]> {
    return await this.smartwatchRepository.find();
  }

  async findOne(id: number): Promise<SmartWatchDevice | null> {
    return await this.smartwatchRepository.findOneBy({ id });
  }

  async findByToken(token: string): Promise<SmartWatchDevice[]> {
    return await this.smartwatchRepository.findBy({ token, active: true });
  }
  async findAllByToken(token: string): Promise<SmartWatchDevice[]> {
    return await this.smartwatchRepository.findBy({ token });
  }
  

  async findBySmartphone(smartphoneId: number): Promise<SmartWatchDevice[]> {
    return await this.smartwatchRepository.findBy({
      smartphoneId,
      active: true,
    });
  }

  async create(
    smartphoneId: number,
    createSmartwatchDto: CreateSmartwatchDto,
  ): Promise<SmartWatchDevice> {
    const smartwatch = this.smartwatchRepository.create({
      ...createSmartwatchDto,
      smartphoneId,
    });
    return await this.smartwatchRepository.save(smartwatch);
  }

  async update(id: number, updateSmartwatchDto: UpdateSmartwatchDto) {
    return await this.smartwatchRepository.update(id, updateSmartwatchDto);
  }

  async remove(id: number) {
    return await this.smartwatchRepository.update(id, { active: false });
  }
}
