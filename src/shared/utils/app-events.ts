import { User, UserEventKeys } from '@/users';

export const BaseEventKeys = {
  error: 'error' as const,
};

export type BaseEventKeys = (typeof BaseEventKeys)[keyof typeof BaseEventKeys];

export interface BaseEvents {
  [BaseEventKeys.error]: Error;
}

export interface AppEvents {
  [BaseEventKeys.error]: Error;
  [UserEventKeys.refreshUsers]: void;
  [UserEventKeys.getUsers]: User[];
  [UserEventKeys.userLoggedIn]: { userId: string };
  [UserEventKeys.userLoggedOut]: { userId: string };
}
