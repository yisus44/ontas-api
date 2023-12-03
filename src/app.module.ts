import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SmartwatchModule } from './smartwatch/smartwatch.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CommonModule } from './common/common.module';
import { TwilioModule } from './twilio/twilio.module';
import { SmartphoneModule } from './smartphone/smartphone.module';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    TwilioModule,
    SmartwatchModule,
    AuthModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        synchronize: true,
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        // entities: [__dirname + '/../**/*.entity.ts'],
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        ssl: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      }),
    }),
    SmartphoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
