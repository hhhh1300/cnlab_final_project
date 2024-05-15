type Props = {
  children: React.ReactNode;
};

async function UserLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 flex w-full min-h-full">
      <div className="w-full">{children}</div>
    </main>
  );
}

export default UserLayout;
