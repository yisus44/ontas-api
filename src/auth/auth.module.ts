import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SmartwatchModule } from 'src/smartwatch/smartwatch.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { SmartphoneModule } from 'src/smartphone/smartphone.module';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'BcryptType',
      useValue: bcrypt,
    },
  ],
  imports: [
    PassportModule,
    ConfigModule,
    SmartphoneModule,
    TwilioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
