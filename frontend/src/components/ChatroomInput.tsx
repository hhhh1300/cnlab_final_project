'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { MessagesContext } from '@/context/message';
import { useMember } from '@/hooks/useMember';

export default function Chatroom({ activityId }: { activityId: string }) {
  const [inputValue, setInputValue] = useState('');
  const { member } = useMember();
  const { sendMessage } = useContext(MessagesContext);
  const handleSubmit = () => {
    // e.preventDefault();
    if (!inputValue) return;
    if (!member) return;
    sendMessage({
      activity_id: activityId,
      message_content: inputValue,
      member_id: member.member_id,
    });
    setInputValue('');
  };
  return (
    <div className="flex flex-row px-2 py-2">
      <Input
        placeholder=""
        id="msg"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter') handleSubmit();
        }}
      />
      <Button onClick={handleSubmit} className="hover:text-yellow-500 ">
        submit
      </Button>
    </div>
  );
}
