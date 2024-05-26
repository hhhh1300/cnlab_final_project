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
  );
}
