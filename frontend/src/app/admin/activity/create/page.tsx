'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CreateActivitySheet from '@/components/CreateActivitySheet';


// import useActivity from '@/hooks/useActivity';
import type { ActivityData } from '@/lib/shared_types';

type Identity = 'Host' | 'Participant' | '';

export default function Page({ params }: { params: { activityId: string } }) {
  const [isOfficial, setIsOfficial] = useState(true);
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center">
        <CreateActivitySheet
          isOfficial={isOfficial}
        />
    </div>
  );
}
