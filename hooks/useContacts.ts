import { useState, useMemo } from 'react';
import { init } from '@instantdb/react';
import type { Contact } from '@/hooks/types';

const db = init({
    appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
});

export const useContacts = () => {
  const { isLoading, error, data } = db.useQuery({ 
    contacts: {},
    message: {} 
  });
  const [searchQuery, setSearchQuery] = useState("");

  const sortedContacts = useMemo(() => {
    if (!data?.contacts) return [];
    return [...data.contacts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data?.contacts]);

  const filteredContacts = useMemo(() => 
    sortedContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [sortedContacts, searchQuery]
  );

  const getLastMessage = (contactId: string) => {
    const contactMessages = data?.message?.filter((msg) => msg.contactId === contactId) || [];
    if (contactMessages.length === 0) return null;
    
    return contactMessages.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  };

  return {
    contacts: filteredContacts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    getLastMessage
  };
};
