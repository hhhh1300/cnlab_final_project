import { MessagesProvider } from '@/context/message';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full h-screen">
        <MessagesProvider>{children}</MessagesProvider>
      </div>
    </div>
  );
};

export default layout;
