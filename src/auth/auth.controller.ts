import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/send-sms-code')
  login(@Body() signUpDto: SignUpDto) {
    return this.authService.sendSMSCode(signUpDto);
  }

  @Post('/check-sms-code')
  checkSMSCode(@Body() signInDto: SignInDto) {
    return this.authService.checkCode(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('/healthcheck')
  healthcheck() {
    return;
  }
}
