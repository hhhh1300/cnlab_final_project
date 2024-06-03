'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import ProfileLayout from '@/app/user/profile/layout';
import { useUser, useMember }  from '@/hooks/useMember';


export default function Page() {
  const [traffic, setTraffic] = useState();
  const { getTraffic } = useUser();
  const { member } = useMember();
  const member_id = member?.member_id;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTraffic(member_id);
      // console.log(data[0].traffic);
      if(typeof data[0] !== "undefined"){
        setTraffic(data[0].traffic);
      }
    };
    fetchData();
    setInterval(() => fetchData(), 60000);
  }, [member, member_id]);

  return (
    <>
      <div className='bg-white text-center text-black rounded-lg transition font-semibold flex flex-col justify-center h-[20vh]'> 
        Remain traffic: {traffic} 
      </div>
    </>
    
  );
}
