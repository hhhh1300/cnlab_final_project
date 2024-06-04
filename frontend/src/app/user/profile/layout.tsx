'use client';

import Navbar from '@/app/user/profile/navbar';
import { useState, useEffect } from 'react';
import { useUser, useMember }  from '@/hooks/useMember';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState();
  const { getName } = useUser();
  const { member } = useMember();
  const member_id  = member?.member_id;


  useEffect(() => {
    const fetchData = async () => {
      const data = await getName(member_id);
      // console.log(data[0].name);
      if(typeof data[0] !== "undefined"){
        setName(data[0].name);
      }
    };
    fetchData();
    if (member == null){
      window.location.href = '/user';
    }
  }, [member, member_id]);
  return (
    
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
        <CardHeader className="bg-gray-50 p-6 text-center text-bold">
         <CardTitle className="text-2xl font-semibold text-gray-900">
          <span className="font-bold">{name}</span>
         </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-6 space-y-6">
          <Navbar />
          <br />
          <main className='flex justify-center'>{children}</main>
        </CardContent>
    </Card>
        
  );
}
