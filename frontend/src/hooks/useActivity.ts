import instance from '@/lib/axios';

export default function useActivity() {
  const getAllActivity = async (category: string | null) => {
    const { data, status } = await instance.get('/activity', {
      params: {
        category,
      },
    });
    return data;
  };

  const getActivityFromMemberID = async (memberID: string) => {
    const { data, status } = await instance.get(`/activity/memberID`, {
      params: {
        memberID,
      },
    });
    return data;
  }

  return { getAllActivity };
}