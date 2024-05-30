'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import ProfileLayout from '@/app/user/profile/layout';
import useMember  from '@/hooks/useMember';

type Props = {
  member_id: number;
  traffic: number;
};

export default function Page({props} : any) {
  const [traffic, setTraffic] = useState();
  const { getName, getTraffic } = useMember();
  const member_id = 100;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTraffic(member_id);
      console.log(data[0].traffic);
      setTraffic(data[0].traffic);
    };
    fetchData();
    setInterval(() => fetchData(), 60000);
  }, [member_id]);

  return (
    <>
      <div className='bg-white text-center text-black rounded-lg transition font-semibold flex flex-col justify-center h-[20vh]'> 
        Remain traffic: {traffic} 
      </div>
    </>
    
  );
}
