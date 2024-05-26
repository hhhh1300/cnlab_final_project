'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Page() {
  const path = usePathname();

  useEffect(() => {
    window.location.href = '/user/profile';
  }, []);

  return (
    <></>
    // <main className="flex flex-col justify-center space-y-6">
    //   <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold`}>
    //     <Link href="/user/profile" className="text-sm lg:text-lg">
    //       Profile
    //     </Link>
    //   </Button>
    //   <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
    //     <Link href="/user/profile" className="text-sm lg:text-lg">
    //       Activity List
    //     </Link>
    //   </Button>
    //   <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
    //     <Link href="/user/profile" className="text-sm lg:text-lg">
    //       Create Activities
    //     </Link>
    //   </Button>
    // </main>
  );
}
