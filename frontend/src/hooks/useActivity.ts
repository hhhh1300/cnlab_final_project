import instance from '@/lib/axios';

export default function useActivity() {
  const getAllActivity = async (category: string | null) => {
    const { data } = await instance.get('/activity', {
      params: {
        category,
      },
    });
    return data;
  };

  const getActivityById = async (activity_id: string) => {
    const { data } = await instance.get('/activity/id', {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const joinActivity = async (activity_id: string) => {
    const { data } = await instance.post('/activity', {
      activity_id,
    });
    return data;
  };

  const getActivityMember = async (activity_id: string) => {
    const { data } = await instance.get('/activity/member', {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const getActivityCapacity = async (activity_id: string) => {
    const { data } = await instance.get('/activity/capacity', {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const createActivity = async (payload, isOfficial, dates, id) => {
    console.log(payload.topic);
    console.log(dates);
    const { data, status } = await instance.post('/create/activity', {
      params: {
        payload,
        isOfficial,
        dates,
        id,
      },
    });
    return data;
  };

  return {
    getAllActivity,
    getActivityById,
    joinActivity,
    createActivity,
    getActivityMember,
    getActivityCapacity,
  };
}
