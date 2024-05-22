'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ActivityCard from '@/components/ActivityCard';
import ParticipantCard from '@/components/ParticipantCard';

// import useActivity from '@/hooks/useActivity';
import type { ActivityData } from '@/lib/shared_types';

type Identity = 'Host' | 'Participant' | '';

export default function Page({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  // const {
  //   getActivityById,
  //   getActivityCapacity,
  //   getActivityComments,
  //   getActivityRating,
  //   getActivityMember,
  //   deleteActivity,
  //   quitActivity,
  //   joinActivity,
  // } = useActivity();
  // const { member } = useMember();

  // const [activity, setActivity] = useState<Activity>();
  // const [capacity, setCapacity] = useState<number>();
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [rating, setRating] = useState<number>(0);
  // const [participants, setParticipants] = useState<Participant[]>([]);
  // const [identity, setIdentity] = useState<Identity>('');
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="flex flex-wrap justify-center">
      <ActivityCard
        activity={activity}
        capacity={capacity}
        comments={comments}
        status={status}
        rating={rating}
        handleClick={handleClick}
        identity={identity}
        isLoading={isLoading}
      />
      {member?.member_id === activity?.member_id && member?.member_id != undefined && (
        <ParticipantCard
          participants={participants}
          setParticipants={setParticipants}
          activityId={params.activityId}
          setCapacity={setCapacity}
        />
      )}
    </div>
  );
}
