'use client';
import { create } from 'zustand';

import { MemberData } from '@/lib/shared_types';
import axios from '@/lib/axios';
import instance from '@/lib/axios';

export default function useUser() {
  // const getAllMemberByActivity = async () => {
  //   const response = await fetch('/api/member');
  //   const data = await response.json();
  //   return data;
  // };
  // return { getAllMemberByActivity };
  const getName = async (member_id: number | null) => {
    const { data, status } = await instance.get('/user', {
      params: {
        member_id,
      },
    });
    return data;
  };
  const getTraffic = async (member_id: number | null) => {
    const { data, status } = await instance.get('/user/traffic', {
      params: {
        member_id,
      },
    });
    return data;
  };

  return { getName, getTraffic };
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
