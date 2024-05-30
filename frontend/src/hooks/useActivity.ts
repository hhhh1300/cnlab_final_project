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

  const getActivityFromMemberID = async (memberID: string) => {
    const { data, status } = await instance.get(`/activity/memberID`, {
      params: {
        memberID,
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

  const createActivity = async (payload, isOfficial, dates) => {
    console.log(payload.topic);
    console.log(dates);
    const { data, status } = await instance.post('/activity', {
      params: {
        payload,
        isOfficial,
        dates,
      },
    });
    return data;
  };

  return {
    getAllActivity,
    getActivityFromMemberID,
    getActivityById,
    joinActivity,
    createActivity,
    getActivityMember,
    getActivityCapacity,
  };
}
