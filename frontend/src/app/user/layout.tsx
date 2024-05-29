import Navbar from "./navbar";

type Props = {
  children: React.ReactNode;
};

async function UserLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 w-full min-h-full">
      <Navbar />
      <div className="w-full pb-20 pt-28">{children}</div>
    </main>
  );
}

export default UserLayout;
