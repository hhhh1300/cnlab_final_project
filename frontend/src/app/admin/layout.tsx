'use client';
import Navbar from '@/app/admin/navbar';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 w-full min-h-full">
      <Navbar />
      <div className="w-full pb-20 pt-28">{children}</div>
    </main>
  );
}
