import { Module } from '@nestjs/common';
import { SmartwatchService } from './smartwatch.service';
import { SmartwatchController } from './smartwatch.controller';
import { SmartWatchDevice } from './entities/smartwatch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SmartwatchController],
  providers: [SmartwatchService],
  imports: [TypeOrmModule.forFeature([SmartWatchDevice])],
  // export it to use it outside this module
  exports: [TypeOrmModule, SmartwatchService],
})
export class SmartwatchModule {}
