import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SmartWatchDevice } from '../../smartwatch/entities/smartwatch.entity';

export const GetCurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): SmartWatchDevice => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
