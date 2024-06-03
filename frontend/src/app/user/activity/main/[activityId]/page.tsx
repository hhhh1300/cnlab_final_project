'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ActivityCard from '@/components/ActivityCard';
import ChatroomInput from '@/components/ChatroomInput';
import ChatroomMessage from '@/components/ChatroomMessage';
import ParticipantCard from '@/components/ParticipantCard';

// import useActivity from '@/hooks/useActivity';
import type { ActivityData as CardData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import { set } from 'date-fns';

type Identity = 'Host' | 'Participant' | '';

type Participant = {
  member_id: string;
  name: string;
  activity_role: string;
};

export default function Page({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  const { getActivityById, getActivityMember, getActivityCapacity, joinActivity, deleteActivity, quitActivity } = useActivity();
  const { member } = useMember();

  const [activityData, setActivityData] = useState<CardData>();
  const [capacity, setCapacity] = useState<number>();
  const [participants, setParticipants] = useState<Participant[]>([]);
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
    if (activityData?.status === 'reviewing') return '審核中';
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
      const people = await getActivityMember(params.activityId);
      setParticipants(people);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      setCapacity(number_of_participant);
      console.log(data)
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.activityId]);

  useEffect(() => {
    if (member && activityData) {
      if (member?.member_id === activityData?.hoster_id) {
        setIdentity('Host');
      } else if (participants.find((p) => p.member_id === member?.member_id)) {
        setIdentity('Participant');
      } else {
        setIdentity('');
      }
      setIsLoading(false);
    }
  }, [participants, member, activityData]);

  const handleClick = async () => {
    setIsLoading(true);
    if (identity === 'Host' && activityData) {
      await deleteActivity(activityData.activity_id);
      if (member) toast.success('活動已刪除');
      router.push('/user');
    } else if (identity === 'Participant' && activityData) {
      if (!member) {
        toast.error('請先登入');
        return;
      }
      await quitActivity(activityData.activity_id, member.member_id);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      const people = await getActivityMember(params.activityId);
      setCapacity(number_of_participant);
      setParticipants(people);
      if (member) toast.success('已退出活動');
    } else if (identity === '' && activityData) {
      if (!member) {
        toast.error('請先登入');
        return;
      } 
        
      await joinActivity(activityData.activity_id, member.member_id);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      const people = await getActivityMember(params.activityId);
      setCapacity(number_of_participant);
      setParticipants(people);
      if (member) toast.success('已報名活動');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <ActivityCard
        activity={activityData}
        member_capacity={capacity}
        status={status}
        handleClick={handleClick}
        identity={identity}
        isLoading={isLoading}
      />
      <div className=" m-auto mt-10 w-[33vw] h-full overflow-hidden flex flex-col shadow-lg">
        <nav className="shadow-md p-3 text-md font-semibold">Chatroom</nav>
        <div className="overflow-y-scroll grow">
          <ChatroomMessage />
        </div>
        <div className="p-2">
          <ChatroomInput activityId={params.activityId} />
        </div>
      </div>
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
