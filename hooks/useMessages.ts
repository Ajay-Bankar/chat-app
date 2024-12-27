// hooks/useMessages.ts
import { useState, useEffect, useReducer } from 'react';
import { init, id } from '@instantdb/react'; // Import id directly
import type { Message } from '@/hooks/types';

const db = init({
    appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
});

type MessageAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'CLEAR_MESSAGES' };

const messageReducer = (state: Message[], action: MessageAction): Message[] => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [...state, action.payload];
    case 'SET_MESSAGES':
      return action.payload;
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export const useMessages = (contactId: string) => {
  const [messages, dispatch] = useReducer(messageReducer, []);
  const [newMessage, setNewMessage] = useState("");

  const { isLoading, error, data } = db.useQuery({
    message: {},
  });

  useEffect(() => {
    if (data?.message) {
      const contactMessages = data.message
        .filter((msg) => msg.contactId === contactId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      dispatch({ type: 'SET_MESSAGES', payload: contactMessages });
    }
  }, [data?.message, contactId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !contactId) return;

    try {
      const messageId = id(); 
      const tx = db.tx.message[messageId].update({
        contactId,
        text: newMessage,
        createdAt: new Date().toISOString(),
      });

      await db.transact(tx);
      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error?.message || error);
      throw error;
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isLoading,
    error
  };
};