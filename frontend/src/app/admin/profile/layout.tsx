import Navbar from '@/app/admin/profile/navbar';


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className='bg-white text-center text-black rounded-lg h-[10vh] transition font-semibold'> MyName </div>
        <Navbar />
        <main className='flex justify-center'>{children}</main>
    </>
        
  );
}
