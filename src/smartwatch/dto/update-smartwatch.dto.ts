import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartwatchDto } from './create-smartwatch.dto';
import { IsOptional } from 'class-validator';

export class UpdateSmartwatchDto extends PartialType(CreateSmartwatchDto) {
  @IsOptional()
  active: boolean;
}
