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

  const createActivity = async (payload, isOfficial, dates) => {
      console.log(payload.topic)
      console.log(dates)
    const { data, status } = await instance.post('/activity', {
      params: {
        payload,
        isOfficial,
        dates,
      },
    });
    return data;
  };

  return { getAllActivity, createActivity };
}
