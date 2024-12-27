import { useState, useMemo } from 'react';
import { init, id } from '@instantdb/react';

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID,
});

export const useMessages = (contactId) => {
  const { isLoading, error, data } = db.useQuery({
    message: {},
  });

  const [newMessage, setNewMessage] = useState('');

  const sortedMessages = useMemo(() => {
    if (!data?.message) return [];
    return data.message
      .filter((msg) => msg.contactId === contactId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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
      setNewMessage(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error?.message || error);
      throw error;
    }
  };

  return {
    messages: sortedMessages,
    isLoading,
    error,
    newMessage,
    setNewMessage,
    sendMessage,
  };
};
