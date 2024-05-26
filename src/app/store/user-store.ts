import { create } from 'zustand';
import { ValidatedUser } from '@/users/types/user';

type UserState = {
  users: ValidatedUser[];
  setUsers: (users: ValidatedUser[]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
