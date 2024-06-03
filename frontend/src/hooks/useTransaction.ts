import instance from '@/lib/axios';

export default function useTransaction() {
  
  const postTransaction = async (member_id: number | null, name: string | null, traffic: number) => {
    console.log('postTransaction');
    const { data, status } = await instance.post('/transaction', {
      params: {
        member_id,
        name,
        traffic
      },
    });
    return data;
  };

  return { postTransaction };
}
