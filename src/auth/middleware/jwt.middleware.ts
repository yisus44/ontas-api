import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SmartwatchService } from '../../smartwatch/smartwatch.service';
import { SmartWatchDevice } from '../../smartwatch/entities/smartwatch.entity';
import { generateUserCache } from '../utils/generateUserCachKey';
import { SmartphoneService } from 'src/smartphone/smartphone.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly smartphoneService: SmartphoneService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const userCacheKey = generateUserCache(decoded);
        const userCached: SmartWatchDevice =
          await this.cacheManager.get(userCacheKey);
        if (userCached) {
          req.user = userCached;
          return next();
        }
        const user = await this.smartphoneService.findOne(decoded.id);
        await this.cacheManager.set(
          userCacheKey,
          user,
          +process.env.USER_CACHE_DEFAULT,
        );
        req.user = user;
      } catch (ex) {
        console.log(ex.message);
      }
    }
    next();
  }
}
