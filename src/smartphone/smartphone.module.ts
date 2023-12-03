import { Module } from '@nestjs/common';
import { SmartphoneService } from './smartphone.service';
import { SmartphoneController } from './smartphone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';

@Module({
  controllers: [SmartphoneController],
  providers: [SmartphoneService],
  imports: [TypeOrmModule.forFeature([Smartphone])],
  // export it to use it outside this module
  exports: [TypeOrmModule, SmartphoneService],
})
export class SmartphoneModule {}
