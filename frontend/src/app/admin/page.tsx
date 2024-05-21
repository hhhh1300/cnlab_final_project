'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col justify-center space-y-6">
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/profile" className="text-sm lg:text-lg">
          監控用戶流量
        </Link>
      </Button>
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/profile" className="text-sm lg:text-lg">
          管理活動
        </Link>
      </Button>
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/admin/create_activities" className="text-sm lg:text-lg">
          辦理官方講座
        </Link>
      </Button>
      <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
        <Link href="/user/profile" className="text-sm lg:text-lg">
          官方講座列表
        </Link>
      </Button>
    </main>
  );
}
