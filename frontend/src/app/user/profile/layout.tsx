'use client';

import Navbar from '@/app/user/profile/navbar';
import { useState, useEffect } from 'react';
import useUser  from '@/hooks/useMember';


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState();
  const { getName } = useUser();
  const member_id  = 100;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getName(member_id);
      console.log(data[0].name);
      setName(data[0].name);
    };
    fetchData();
  }, [member_id]);
  return (
    
    <>
        <div className='bg-white text-center text-black rounded-lg h-[10vh] transition font-semibold'> {name} </div>
        <Navbar />
        <br />
        <main className='flex justify-center'>{children}</main>
    </>
        
  );
}
