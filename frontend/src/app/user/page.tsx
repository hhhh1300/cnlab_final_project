'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Card from '@/components/Card';
// import { useState } from 'react';

// TODO: activity hook
// import useActivity from '@/hooks/useActivity';

export default function Page() {
  // const { getAllActivity } = useActivity();
  // const [activityData, setActivityData] = useState([]);

  return (
    <main className="flex flex-col justify-center space-y-6">
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/profile" className="text-sm lg:text-lg">
          Profile
        </Link>
      </Button>
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/activity" className="text-sm lg:text-lg">
          Activity List
        </Link>
      </Button>
      {/* <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {activityData?.map((card) => (
          <Card
            key={card.activity_id}
            data={card}
            follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
          />
        ))}
      </div> */}
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/create_activities" className="text-sm lg:text-lg">
          Create Activities
        </Link>
      </Button>
    </main>
  );
}
