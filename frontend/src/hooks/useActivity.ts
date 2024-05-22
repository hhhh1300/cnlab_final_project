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

  return { getAllActivity };
}
