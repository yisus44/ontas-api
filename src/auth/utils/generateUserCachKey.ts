import { SmartWatchDevice } from '../../smartwatch/entities/smartwatch.entity';

export function generateUserCache(user: SmartWatchDevice) {
  return 'USER-ID' + user.id;
}
