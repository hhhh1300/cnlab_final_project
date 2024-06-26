'use client';

import { Button } from '@/components/ui/button';
import { useMember } from '@/hooks/useMember';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image  from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  let lastSegment = '';
  lastSegment = path.substring(path.lastIndexOf('/') + 1);
  const { member, logout, fetchMember } = useMember();
  console.log(member);
  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  const handleLogout = () => {
    logout();
    router.push('/user');
  };

  return (
    <>
      <div className="bg-white  text-black font-semibold space-y-4 items-center">
        {/* <Button className="bg-white text-black h-[10vh] justify-center  hover:bg-white transition font-bold"> */}
          {/* <span className="bg-black text-white h-[7vh] w-[16vh] rounded-xl transition hover:bg-black font-extrabold flex items-center justify-center"> */}
            <Link href="/user" className="text-sm lg:text-lg">
              <Button className="relative  rounded-xl bg-slate-400 bg-white text-black font-semibold items-center w-[16vh] h-[16vh] pt-20 ml-5">
              <Image fill
              className="object-cover h-full group-hover:scale-110 transition"
              src={'/images/logo.png'}
              alt="EnageNTU"
              priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vh"/>
              </Button>
          
            </Link>
            
          {/* </span> */}
        {/* </Button> */}
       <div className="bg-white text-black rounded-lg h-[10vh] font-semibold float-right mr-5">
        {member && (
          <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'profile' ? 'font-bold' : ''
          }`}
        >
          <Link href="/user/profile" className="text-sm lg:text-lg">
            Profile
          </Link>
        </Button>
        )}
        
        <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'activity' ? 'font-bold' : ''
          }`}
        >
          <Link href="/user/activity" className="text-sm lg:text-lg">
            Activity List
          </Link>
        </Button>

        {member && (
          <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100  font-semibold ${
            lastSegment === 'create_activities' ? 'font-bold' : ''
          }`}
        >
          <Link href="/user/activity/create" className="text-sm lg:text-lg">
            Create Activities
          </Link>
        </Button>
        )}

        
        <div
          className={`bg-white text-black rounded-lg h-[6vh] hover:bg-neutral-100 transition font-semibold float-right mr-5 mt-4 items-center justify-center align-middle ${
            lastSegment === 'login' ? 'font-bold' : ''
          }`}
        >
          {!member && (
            <Button className="text-sm lg:text-lg">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {member && (
            <Button className="text-sm lg:text-lg" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
