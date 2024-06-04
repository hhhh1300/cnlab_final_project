'use client';
import Navbar from '@/app/admin/navbar';
import { useEffect } from 'react';
import { useMember } from '@/hooks/useMember';
type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const { member, logout, fetchMember } = useMember();   
  console.log(member)
  useEffect(() => {                                                                                            
    fetchMember();                                                                                             
  }, [fetchMember]);
  let cnt = 0;
  useEffect(() => {
    console.log(member)
      if (member?.member_role === "User"){
        window.location.href = '/user';
      }
      else if (member?.member_role === "Admin"){
        cnt += 1;
      }
    }, [member]);

  return (
    <main className="flex-row justify-center top-0 w-full min-h-full">
      <Navbar />
      <div className="w-full pb-20 pt-28">{children}</div>
    </main>
  );
}
