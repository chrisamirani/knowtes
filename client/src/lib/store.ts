'use client';

import API from '@/api';
import { IClientUser } from '@/api-sdk';
import { create, StoreApi, UseBoundStore } from 'zustand';

interface IUserStore {
  user: IClientUser | Record<string, never>;
  fetchUser: () => Promise<void>;
}

export const useUserStore: UseBoundStore<StoreApi<IUserStore>> = create(
  (set) => ({
    user: {},
    fetchUser: async () => {
      try {
        const user = await API.UsersService.me();

        set({ user });
      } catch (e: unknown) {
        console.log('Could not load user', e);
      }
    },
  })
);
