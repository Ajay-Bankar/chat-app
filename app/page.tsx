'use client';

import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import ContactList from "@/components/ContactList";
import { useScreenSize } from '@/hooks/useScreenSize';

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const { isSmallScreen } = useScreenSize();

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
  };

  const goBack = () => {
    setSelectedContact(null);
  };

  return (
    <div className="h-screen">
      {isSmallScreen ? (
        <div className="h-full">
          {selectedContact ? (
            <div className="h-full">
              <button
                className="p-2 bg-gray-200 border-b w-full"
                onClick={goBack}
              >
                Back to Contacts
              </button>
              <ChatWindow contact={selectedContact} />
            </div>
          ) : (
            <ContactList 
              onContactClick={handleContactClick}
              selectedContactId={selectedContact}
            />
          )}
        </div>
      ) : (
        <div className="flex h-full">
          <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
            <ContactList 
              onContactClick={handleContactClick}
              selectedContactId={selectedContact}
            />
          </div>
          <div className="w-2/3 bg-white overflow-y-auto">
            {selectedContact ? (
              <ChatWindow contact={selectedContact} />
            ) : (
              <p className="text-center text-gray-500">Select a contact to start chatting</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}