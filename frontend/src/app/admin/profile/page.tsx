'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import ProfileLayout from '@/app/admin/profile/layout';


export default function Page() {
 
  const [Id, setUserId] = useState('');
  useEffect(() => {
      document.title = "Profile Page";
      // get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  return (
    <>
      <div className='bg-white text-center text-black rounded-lg transition font-semibold flex flex-col justify-center h-[20vh]'> 
        <h1>搜尋用戶</h1>
        <input
          type="text"
          value={Id}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="輸入學號"
        />
        <Link href={`/admin/profile/${Id}`} className="text-sm lg:text-lg">
          搜尋
        </Link>
      </div>
    </>
    
  );
}
