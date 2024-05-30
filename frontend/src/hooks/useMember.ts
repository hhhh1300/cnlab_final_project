import instance from '@/lib/axios';

export default function useMember() {
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
