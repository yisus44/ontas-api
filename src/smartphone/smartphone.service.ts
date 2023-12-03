import { Injectable } from '@nestjs/common';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';
import { UpdateSmartphoneDto } from './dto/update-smartphone.dto';
import { Smartphone } from './entities/smartphone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SmartphoneService {
  constructor(
    @InjectRepository(Smartphone)
    private smartphoneRepository: Repository<Smartphone>,
  ) {}

  async findOneByPhone(phoneNumber: string) {
    return await this.smartphoneRepository.findOneBy({ phoneNumber });
  }
  async findAll(): Promise<Smartphone[]> {
    return await this.smartphoneRepository.find();
  }

  async findOne(id: number): Promise<Smartphone | null> {
    return await this.smartphoneRepository.findOneBy({ id });
  }

  async findOneByCode(currentCode: string): Promise<Smartphone | null> {
    return await this.smartphoneRepository.findOneBy({ currentCode });
  }

  async create(createUserDto: CreateSmartphoneDto): Promise<Smartphone> {
    const smartphone = this.smartphoneRepository.create(createUserDto);
    return await this.smartphoneRepository.save(smartphone);
  }

  async update(id: number, updateSmartphoneDto: UpdateSmartphoneDto) {
    return await this.smartphoneRepository.update(id, updateSmartphoneDto);
  }

  async remove(id: number) {
    return await this.smartphoneRepository.delete(id);
  }
}
