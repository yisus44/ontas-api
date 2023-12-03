import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^\\+(\\d{1,2}-)?\\d{2,4}\\d{10}$')
  phoneNumber: string;
}
