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

  const createActivity = async (payload) => {
      console.log(payload.topic)
      const isOfficial = 1
    const { data, status } = await instance.post('/activity', {
      params: {
        payload,
        isOfficial,
      },
    });
    return data;
  };

  return { getAllActivity, createActivity };
}
