import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmartphoneService } from './smartphone.service';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';
import { UpdateSmartphoneDto } from './dto/update-smartphone.dto';

@Controller('smartphone')
export class SmartphoneController {
  constructor(private readonly smartphoneService: SmartphoneService) {}

  @Post()
  create(@Body() createSmartphoneDto: CreateSmartphoneDto) {
    return this.smartphoneService.create(createSmartphoneDto);
  }

  @Get()
  findAll() {
    return this.smartphoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smartphoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmartphoneDto: UpdateSmartphoneDto) {
    return this.smartphoneService.update(+id, updateSmartphoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smartphoneService.remove(+id);
  }
}
