import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { ConfigModule } from '@nestjs/config';
import { Twilio } from 'twilio';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: Twilio,
      useFactory: async () =>
        new Twilio(process.env.TWILIO_ACCT_ID, process.env.TWILIO_AUTH_ID),
    },
    TwilioService,
  ],
  exports: [TwilioService],
})
export class TwilioModule {}
