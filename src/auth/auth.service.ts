import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

import { sign } from 'jsonwebtoken';

import { BcryptType } from './types/bcrypt.type';
import { CommonService } from 'src/common/common.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { SmartphoneService } from 'src/smartphone/smartphone.service';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly smartphoneService: SmartphoneService,
    @Inject('BcryptType') private readonly bcrypt: BcryptType,
    private readonly commonService: CommonService,
    private readonly twilioService: TwilioService,
  ) {}
  async sendSMSCode(signUpDto: SignUpDto) {
    const loginCode = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
    try {
      const match = await this.smartphoneService.findOneByPhone(
        signUpDto.phoneNumber,
      );
      if (match) {
        await this.smartphoneService.update(match.id, {
          currentCode: loginCode,
        });
      } else {
        await this.smartphoneService.create({
          ...signUpDto,
          currentCode: loginCode,
        });
      }

      const message = `Inicia sesion con el codigo ${loginCode}`;
      await this.twilioService.sendMessage(message, signUpDto.phoneNumber);
      return { result: true };
    } catch (error) {
      throw error;
    }
  }

  async checkCode(signInDto: SignInDto) {
    const smartphone = await this.smartphoneService.findOneByCode(
      signInDto.code,
    );
    if (!smartphone) throw new NotFoundException();
    return await this.getAuthInfo(smartphone);
  }

  async getAuthInfo(smartphone: Smartphone) {
    const expirationTime = process.env.JWT_EXPIRATION_TIME || '48h'; // Example:
    const token = await this.signPayload(smartphone, expirationTime);
    const expiresInMilliseconds =
      this.commonService.parseDurationToMilliseconds(expirationTime);
    const expirationTimestamp = Date.now() + expiresInMilliseconds;
    return { token, smartwatch: smartphone, expirationTimestamp };
  }

  async signPayload(smartwatch: Smartphone, expirationTime: string) {
    const payload = {
      id: smartwatch.id,
    };

    return sign(payload, process.env.JWT_SECRET || 'developmentesecret<', {
      expiresIn: expirationTime,
    });
  }
}
