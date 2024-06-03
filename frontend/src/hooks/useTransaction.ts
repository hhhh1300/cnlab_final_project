import instance from '@/lib/axios';

export default function useTransaction() {
  
<<<<<<< HEAD
  const postTransaction = async (member_id: number | null, name: string | null, traffic: number) => {
=======
  const postTransaction = async (member_id: string | undefined, name: string | null, traffic: number) => {
>>>>>>> 598198d5747014af043bac9822c12562d74a416a
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
