'use client';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 flex w-full min-h-full">
      <div className="w-full">{children}</div>
    </main>
  );
}
