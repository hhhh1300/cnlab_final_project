import instance from '@/lib/axios';

export default function useUser() {
  const getUserById = async (member_id: string) => {
    const { data } = await instance.get('/user/id', {
      params: {
        member_id,
      },
    });
    return data;
  };
  return { getUserById };
}
