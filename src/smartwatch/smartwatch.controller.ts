import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SmartwatchService } from './smartwatch.service';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetCurrentUser } from 'src/auth/decorators/current-user';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';


@Controller('smartwatch')
export class SmartwatchController {
  constructor(private readonly smartwatchService: SmartwatchService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createSmartwatchDto: CreateSmartwatchDto,
    @GetCurrentUser() smartphone: Smartphone,
  ) {
    return this.smartwatchService.create(smartphone.id, createSmartwatchDto);
  }

  @Get()
  findAll(@Query('token') token: string) {
    return this.smartwatchService.findByToken(token);
  }

  @Get("/token/all")
  findAllByToken(@Query('token') token: string) {
    return this.smartwatchService.findAllByToken(token);
  }
  
  
  @UseGuards(AuthGuard)
  @Get('/me')
  findBySmartphone(@GetCurrentUser() smartphone: Smartphone) {
    return this.smartwatchService.findBySmartphone(smartphone.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.smartwatchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateSmartwatchDto,
  ) {
    return this.smartwatchService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.smartwatchService.remove(+id);
  }
}
