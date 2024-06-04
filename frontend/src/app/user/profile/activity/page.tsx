'use client';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import type { ActivityData as CardData } from '@/lib/shared_types';

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [activityData, setActivityData] = useState<CardData[]>([]);
  const { getUserActivity } = useActivity();
  const { member } = useMember();
  const member_id = member?.member_id;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserActivity(member_id, category);
      console.log(data);
      setActivityData(data);
    };
    fetchData();
  }, [category, member]);

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 ">
        {activityData?.map((card) => <Card key={card.activity_id} data={card} />)}
      </div>
    </main>
  );
}
