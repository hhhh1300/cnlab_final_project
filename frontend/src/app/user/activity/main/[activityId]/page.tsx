'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ActivityCard from '@/components/ActivityCard';
import ParticipantCard from '@/components/ParticipantCard';

// import useActivity from '@/hooks/useActivity';
import type { ActivityData as CardData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';

type Identity = 'Host' | 'Participant' | '';

export default function Page({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  const { getActivityById } = useActivity();
  // const { member } = useMember();

  const [activityData, setActivityData] = useState<CardData>();
  const [identity, setIdentity] = useState<Identity>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const status = useCallback(() => {
    if (!activityData) return;
    const now = new Date();
    const eventStart = new Date(activityData.event_start_timestamp);
    const eventEnd = new Date(activityData.event_end_timestamp);
    const registrationStart = new Date(activityData.register_start_timestamp);
    const registrationEnd = new Date(activityData.register_end_timestamp);

    if (activityData?.status === 'cancelled') return '已刪除';
    if (now < registrationStart) return '即將開始註冊';
    if (now > registrationStart && now < registrationEnd) return '註冊中';
    if (now > registrationEnd && now < eventStart) return '即將開始活動';
    if (now > eventStart && now < eventEnd) return '進行中';
    if (now > eventEnd) return '已結束';
  }, [activityData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityById(params.activityId);
      setActivityData(data[0]);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.activityId]);

  const handleClick = async () => {
    setIsLoading(true);
    // if (identity === 'Host' && activity) {
    //   await deleteActivity(activity.activity_id);
    //   if (member) toast.success('活動已刪除');
    //   router.push('/');
    // } else if (identity === 'Participant' && activity) {
    //   await quitActivity(activity.activity_id);
    //   const { number_of_participant } = await getActivityCapacity(params.activityId);
    //   const people = await getActivityMember(params.activityId);
    //   setCapacity(number_of_participant);
    //   setParticipants(people);
    //   if (member) toast.success('已退出活動');
    // } else if (identity === '' && activity) {
    //   await joinActivity(activity.activity_id);
    //   const { number_of_participant } = await getActivityCapacity(params.activityId);
    //   const people = await getActivityMember(params.activityId);
    //   setCapacity(number_of_participant);
    //   setParticipants(people);
    //   if (member) toast.success('已報名活動');
    // }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <ActivityCard
        activity={activityData}
        status={status}
        handleClick={handleClick}
        identity={identity}
        isLoading={isLoading}
      />
      {/* {member?.member_id === activity?.member_id && member?.member_id != undefined && (
        <ParticipantCard
          participants={participants}
          setParticipants={setParticipants}
          activityId={params.activityId}
          setCapacity={setCapacity}
        />
      )} */}
    </div>
  );
}
