import { BaseEventKeys, BaseEvents } from '@/utils/app-events';
import { User } from './types/user';

export enum UserEventKeys {
  refreshUsers = 'refreshUsers',
  getUsers = 'getUsers',
  userLoggedIn = 'userLoggedIn',
  userLoggedOut = 'userLoggedOut',
}

export interface UserEvents extends BaseEvents {
  [UserEventKeys.refreshUsers]: undefined;
  [UserEventKeys.getUsers]: undefined;
  [UserEventKeys.userLoggedIn]: undefined;
  [UserEventKeys.userLoggedOut]: undefined;
}
