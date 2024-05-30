'use client';
import { MessagesContext } from '@/context/message';
import { useMember } from '@/hooks/useMember';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function ChatRoomMessages() {
  const { messages } = useContext(MessagesContext);
  const { member } = useMember();
  const router = useRouter();
  // console.log(messages);

  return (
    <div className="px-2 pt-4 h-[100vh]">
      {messages?.map((message, index) => {
        const isSender = message.member_id === member?.member_id;
        return (
          <div key={index} className="w-full pt-1">
            <div className={`flex flex-row items-center ${isSender && 'justify-end'}`}>
              {!isSender && (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[60%] rounded-2xl px-3 py-1 leading-6`}>
                <div>
                  {!isSender && (
                    <div
                      className={cn(
                        'flex flex-col justify-start items-start rounded-2xl leading-6 text-center text-[0.8rem] font-bold'
                      )}
                    >
                      {message.member_name + ' :'}
                    </div>
                  )}
                  <div className='$max-w-[60%] rounded-2xl px-3 py-1 leading-6{isSender ? "bg-black text-white" : " bg-gray-200 text-black"}'>
                    {message.message_content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatRoomMessages;
