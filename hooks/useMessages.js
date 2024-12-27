import { useState, useEffect, useReducer } from 'react';
import { init, id } from '@instantdb/react'; // Import id directly

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID,
});

const messageReducer = (state, action) => {
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

export const useMessages = (contactId) => {
  const [messages, dispatch] = useReducer(messageReducer, []);
  const [newMessage, setNewMessage] = useState('');

  const { isLoading, error, data } = db.useQuery({
    message: {},
  });

  useEffect(() => {
    if (data?.message) {
      // Ensure each message has contactId, text, and createdAt
      const contactMessages = data.message
        .filter((msg) => msg.contactId === contactId) // Filter messages by contactId
        .map((msg) => ({
          contactId: msg.contactId,
          text: msg.text,
          createdAt: msg.createdAt,
        }))
        .sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ); // Sort by createdAt

      dispatch({ type: 'SET_MESSAGES', payload: contactMessages }); // Dispatch filtered and sorted messages
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
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error?.message || error);
      throw error;
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isLoading,
    error,
  };
};
