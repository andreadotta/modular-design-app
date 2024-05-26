import { User } from '@/users';
import { create } from 'zustand';

type UserState = {
  users: User[];
  setUsers: (users: User[]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
