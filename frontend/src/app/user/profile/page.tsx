'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import ProfileLayout from '@/app/user/profile/layout';
import Traffic from './traffic';


export default function Page() {
  const [user, setUser] = useState();

  useEffect(() => {
      document.title = "Profile Page";
      // get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  return (
    <>
      <div className='bg-white text-center text-black rounded-lg transition font-semibold flex flex-col justify-center h-[20vh]'> 
        Remain traffic: {30} 
      </div>
    </>
    
  );
}
