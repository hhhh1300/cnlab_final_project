'use client';
import { create } from 'zustand';

import { MemberData } from '@/lib/shared_types';
import axios from '@/lib/axios';
import instance from '@/lib/axios';

export function useUser() {

  const getName = async (member_id: string | undefined) => {
    const { data, status } = await instance.get('/user', {
      params: {
        member_id,
      },
    });
    return data;
  };
  const getTraffic = async (member_id: string | undefined) => {
    const { data, status } = await instance.get('/user/traffic', {
      params: {
        member_id,
      },
    });
    return data;
  };
  const checkUser = async (name: string | undefined) => {
    const { data, status } = await instance.get('/user/checkuser', {
      params: {
        name,
      },
    });
    return data;
  };

  return { getName, getTraffic, checkUser };
}

interface state {
  member: MemberData | null;
}

interface actions {
  setMember: (member: MemberData) => void;
  fetchMember: () => void;
  logout: () => void;
}

export const useMember = create<state & actions>((set) => ({
  member: null,
  setMember: (member: MemberData) => set({ member }),
  fetchMember: async () => {
    // get status from server
    const { data } = await axios.get(`/user/islogin`);
    if (data) {
      set({ member: data });
    }
  },
  logout: async () => {
    await axios.post(`/user/logout`);
    set({ member: null });
  },
}));
