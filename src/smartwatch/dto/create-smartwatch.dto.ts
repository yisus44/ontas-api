import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSmartwatchDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  childName: string;

  @IsOptional()
  @IsNumber()
  currentLat: number;

  @IsOptional()
  @IsNumber()
  currentLong: number;

  @IsOptional()
  @IsNumber()
  referenceLat: number;

  @IsOptional()
  @IsNumber()
  referenceLong: number;

  @IsOptional()
  @IsNumber()
  maxDistanceRadio: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}
