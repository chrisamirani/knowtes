'use client';

import API from '@/api';
import { IClientUser, ITeamMember } from '@/api-sdk';
import { create, StoreApi, UseBoundStore } from 'zustand';

interface IKnowtesStore {
  user: IClientUser | undefined;
  members: ITeamMember[];
  fetchUser: () => Promise<void>;
  fetchMembers: () => Promise<void>;
}

export const useKnowtesStore: UseBoundStore<StoreApi<IKnowtesStore>> = create(
  (set) => ({
    user: undefined,
    members: [],
    fetchUser: async () => {
      try {
        const user = await API.UsersService.me();

        set({ user });
      } catch (e: unknown) {
        console.log('Could not load user', e);
      }
    },
    fetchMembers: async () => {
      try {
        const members = await API.TeamService.getMembers();

        set({ members });
      } catch (e: unknown) {
        console.log('Could not load members', e);
      }
    },
  })
);
