import { PartialType } from '@nestjs/swagger';
import { CreateSmartphoneDto } from './create-smartphone.dto';

export class UpdateSmartphoneDto extends PartialType(CreateSmartphoneDto) {}
