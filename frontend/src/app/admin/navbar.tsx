'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { useMember } from '@/hooks/useMember';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { member, logout, fetchMember } = useMember();
  console.log(member);
  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  const handleLogout = () => {
    logout();
    router.push('/user');
  };

  let lastSegment = '';
  lastSegment = path.substring(path.lastIndexOf('/') + 1);

  return (
    <>
      <div className="bg-white  text-black font-semibold space-y-6 items-center">
        <Button className="bg-white text-black h-[10vh] justify-center  hover:bg-white transition font-bold">
          <span className="bg-black text-white h-[6vh] w-[15vh] rounded-md transition hover:bg-black font-bold flex items-center justify-center">
            <Link href="/admin" className="text-sm lg:text-lg">
              EngageNTU
            </Link>
          </span>
        </Button>
        <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'profile' ? 'font-bold' : ''
          }`}
        >
          <Link href="/admin/profile" className="text-sm lg:text-lg">
            Traffic
          </Link>
        </Button>
        <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'activity' ? 'font-bold' : ''
          }`}
        >
          <Link href="/admin/activity/manage" className="text-sm lg:text-lg">
            Audit Activity
          </Link>
        </Button>
        <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'activity' ? 'font-bold' : ''
          }`}
        >
          <Link href="/admin/activity" className="text-sm lg:text-lg">
            Official Activity List
          </Link>
        </Button>
        <Button
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${
            lastSegment === 'create_activities' ? 'font-bold' : ''
          }`}
        >
          <Link href="/admin/activity/create" className="text-sm lg:text-lg">
            Create Official Activities
          </Link>
        </Button>
        <div
          className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold float-right mr-5 ${
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
    </>
  );
}
