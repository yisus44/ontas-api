import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private readonly client: Twilio) {}

  async sendMessage(message: string, to: string) {
    try {
      const sentMessage = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_FROM_PHONE,
        to: to,
      });
      console.log('Message sent:', sentMessage.sid);
      return sentMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
