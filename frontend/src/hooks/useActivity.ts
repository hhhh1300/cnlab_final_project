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

  const getUserActivity = async (member_id: string | undefined, category: string | null) => {
    const { data, status } = await instance.get(`/activity/memberID`, {
      params: {
        member_id,
        category
      },
    });
    return data;
  }

  const getActivityById = async (activity_id: string) => {
    const { data } = await instance.get('/activity/id', {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const joinActivity = async (activity_id: string, member_id: string) => {
    const { data } = await instance.post('/activity', {
      activity_id,
      member_id,
    });
    return data;
  };

  const quitActivity = async (activity_id: string, member_id: string) => {
    const { data } = await instance.delete('/activity/member', {
      params: {
        activity_id,
        member_id,
      },
    });
    return data;  
  };

  const deleteActivity = async (activity_id: string) => {
    const { data } = await instance.delete('/activity', {
      params: {
        activity_id,
      },
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
    const { data, status } = await instance.post('/activity/create', {
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
    getUserActivity,
    getActivityById,
    joinActivity,
    createActivity,
    getActivityMember,
    getActivityCapacity,
    deleteActivity,
    quitActivity,
  };
}
