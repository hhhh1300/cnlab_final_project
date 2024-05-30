'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <div className="flex flex-col sm:p-4 text-sm lg:text-lg">
        <Link
          href="/user"
          className="bg-white text-center
          text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold"
        >
          user page
        </Link>
        <Link
          href="/admin"
          className="bg-white text-center
          text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold"
        >
          admin page
        </Link>
      </div>
    </main>
  );
}
