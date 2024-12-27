'use client';

import { useState, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';
import ContactList from '@/components/ContactList';
import { useScreenSize } from '@/hooks/useScreenSize';
import Loader from '@/components/Loader'; // Import the loader

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const { isSmallScreen } = useScreenSize();
  const [loading, setLoading] = useState(true); // State to handle loading

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0); 
  }, []);

  return (
    <div className="h-screen">
      {loading ? (
        <Loader /> 
      ) : (
        isSmallScreen ? (
          <div className="h-full ">
            {selectedContact ? (
              <ChatWindow contact={selectedContact} onBack={handleBack} />
            ) : (
              <ContactList 
                onContactClick={handleContactClick}
                selectedContactId={selectedContact?.id || null}
              />
            )}
          </div>
        ) : (
          <div className="flex h-full">
            <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
              <ContactList 
                onContactClick={handleContactClick}
                selectedContactId={selectedContact?.id || null}
              />
            </div>
            <div className="w-2/3 bg-white overflow-y-auto">
              {selectedContact ? (
                <ChatWindow contact={selectedContact} onBack={handleBack} />
              ) : (
                <p className="text-center text-gray-500">Select a contact to start chatting</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
