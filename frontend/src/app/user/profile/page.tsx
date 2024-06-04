'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import ProfileLayout from '@/app/user/profile/layout';
import { useUser, useMember }  from '@/hooks/useMember';

import { Progress } from "@/components/ui/progress"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
     <div className='bg-white '>
      <div className="flex items-center space-x-9">
        <Progress value={ traffic/1000} />
      </div>
      <br/>
      <div className="flex items-center space-x-9">
        <span className="text-gray-600">剩餘流量: {traffic} bytes</span>
      
      
      </div>
    </div>
    
  );
}
