'use client';

import Navbar from '@/app/user/profile/navbar';
import { useState, useEffect } from 'react';
import { useUser, useMember }  from '@/hooks/useMember';


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
  }, [member, member_id]);
  return (
    
    <>
        <div className='bg-white text-center text-black rounded-lg h-[10vh] transition font-semibold'> {name} </div>
        <Navbar />
        <br />
        <main className='flex justify-center'>{children}</main>
    </>
        
  );
}
