'use client';
import { createContext, useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { MessageData } from '@/lib/shared_types';
import instance from '@/lib/axios';
import { useParams } from 'next/navigation';

export type MessagesContext = {
  messages: MessageData[];
  socket: Socket | null;
  setMessages: (messages: MessageData[]) => void;
  sendMessage: (message: Omit<MessageData, 'message_timestamp' | 'message_id'>) => Promise<void>;
};

export const MessagesContext = createContext<MessagesContext>({
  messages: [],
  setMessages: () => {},
  socket: null,
  sendMessage: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export function MessagesProvider({ children }: Props) {
  const { activityId } = useParams();
  // console.log('useParam', activityId);
  const chatgroup_id = Array.isArray(activityId) ? activityId[0] : activityId;
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('useEffect');
    const initSocket = () => {
      const socket = io('http://localhost:8080');
      socket.on('receive_message', (newMessage: MessageData) => {
        console.log('receive_message');
        setMessages((messages) => [...messages, newMessage]);
      });
      setSocket(socket);
    };
    const fetchMessages = async (activityId: string) => {
      try {
        const { data } = await instance('/message/id', { params: { activity_id: activityId } });
        if (data) {
          setMessages(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initSocket();
    fetchMessages(chatgroup_id);
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async (message: Omit<MessageData, 'message_timestamp' | 'message_id'>) => {
    if (!socket) {
      alert('No socket! Please retry later.');
      return;
    }
    try {
      const { data } = await instance.post('/message', {
        ...message,
      });
      if (data) {
        socket.emit('send_message', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessagesContext.Provider value={{ messages, setMessages, sendMessage, socket }}>
      {children}
    </MessagesContext.Provider>
  );
}
