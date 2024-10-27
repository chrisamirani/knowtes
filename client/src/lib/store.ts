'use client';

import API from '@/api';
import { IClientUser } from '@/api-sdk';
import { create, StoreApi, UseBoundStore } from 'zustand';

interface IKnowtesStore {
  user: IClientUser | undefined;
  fetchUser: () => Promise<void>;
}

export const useKnowtesStore: UseBoundStore<StoreApi<IKnowtesStore>> = create(
  (set) => ({
    user: undefined,
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
