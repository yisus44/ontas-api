import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
export class CreateSmartphoneDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ValidateIf(() => false)
  currentCode?: string;
}
