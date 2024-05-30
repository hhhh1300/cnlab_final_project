'use client';

import ChatroomInput from '@/components/ChatroomInput';
import ChatroomMessage from '@/components/ChatroomMessage';

export default function Page({ activityId }: { activityId: string }) {
  return (
    <div className="h-full overflow-hidden flex flex-col shadow-lg">
      <nav className="shadow-md p-3 text-md font-semibold">Chatroom</nav>
      <div className="overflow-y-scroll grow">
        <ChatroomMessage />
      </div>
      <div className="p-2">
        <ChatroomInput activityId={activityId} />
      </div>
    </div>
  );
}
