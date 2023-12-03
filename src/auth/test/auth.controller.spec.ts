import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { SmartwatchService } from '../../smartwatch/smartwatch.service';
import { SmartWatchDevice } from '../../smartwatch/entities/smartwatch.entity';

import { MailService } from '../../mail/mail.service';
import { CommonService } from '../../common/common.service';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { EmailInUseException } from '../../common/exceptions/email-in-use.exception';
import { PostgresErrorCode } from '../../database/postgresErrorCodes.enum';
import { AuthController } from '../auth.controller';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';
import { GetCurrentUser } from '../decorators/current-user';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            verify: jest.fn(),
            demoEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call authService.signUp with the provided SignUpDto', () => {
      const signUpDto: SignUpDto = {
        name: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        profilePictureId: null,
      };

      authController.login(signUpDto);

      expect(authService.sendSMSCode).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signIn', () => {
    it('should call authService.signIn with the provided SignInDto', () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      authController.checkSMSCode(signInDto);

      expect(authService.checkCode).toHaveBeenCalledWith(signInDto);
    });
  });

  describe('verify', () => {
    it('should call authService.verify with the provided SignInDto', () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      authController.verify(signInDto);

      expect(authService.verify).toHaveBeenCalledWith(signInDto);
    });
  });

  // ... other describe blocks for other methods
});
