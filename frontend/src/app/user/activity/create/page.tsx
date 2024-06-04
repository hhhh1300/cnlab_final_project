'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMember } from '@/hooks/useMember';
import toast from 'react-hot-toast';
import CreateActivitySheet from '@/components/CreateActivitySheet';
import InputForm from '@/components/InputForm';

// import useActivity from '@/hooks/useActivity';
import type { ActivityData } from '@/lib/shared_types';

type Identity = 'Host' | 'Participant' | '';

export default function Page({ params }: { params: { activityId: string } }) {
  const { member, logout, fetchMember } = useMember();  
  useEffect(() => {                                                                                            
    fetchMember();                                                                                             
  }, [fetchMember]);
  if (member == null){
      window.location.href = '/user/activity';
  }
  const [isOfficial, setIsOfficial] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center">
      <CreateActivitySheet isOfficial={isOfficial} />
    </div>
  );
}
