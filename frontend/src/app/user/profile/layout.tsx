`use client`;

import Navbar from '@/app/user/profile/navbar';


export default function ProfileLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
        <div className='bg-white text-center text-black rounded-lg h-[10vh] transition font-semibold'> MyName </div>
        <Navbar />
        <br />
        <main className='flex justify-center'>{children}</main>
    </>
        
  );
}
