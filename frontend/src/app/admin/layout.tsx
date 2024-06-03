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
  useEffect(() => {
      if (member?.member_role == "User"){
        window.location.href = '/user';
      }
    }, [member]);
  return (
    <main className="flex-row justify-center top-0 w-full min-h-full">
      <Navbar />
      <div className="w-full pb-20 pt-28">{children}</div>
    </main>
  );
}
