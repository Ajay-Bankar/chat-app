'use client';

import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import SearchField from "./SearchField";
import AddContactModal from "./AddContactModal";
import { useContacts } from "@/hooks/useContacts";

const ContactList = ({ onContactClick, selectedContactId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    contacts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    getLastMessage,
  } = useContacts();

  if (isLoading) return <div>Fetching contacts...</div>;
  if (error) return <div>Error fetching contacts: {error.message}</div>;

  return (
    <div className="w-full flex flex-col h-full ">

      {/* header start */}
      <div className="sticky top-0 bg-white border-b shadow-sm z-10">
        <div className="flex justify-between bg-white items-center px-4 py-4">
          <p className="text-gray-900 font-semibold text-2xl">Chats</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-full border   hover:bg-gray-100"
              title="Add New Contact"
            >
              <IoMdAdd className="text-[24px] font-semibold" />
            </button>
            <BsThreeDotsVertical className=" text-[24px]" />
          </div>
        </div>

        <div className="px-4 py-2">
          <SearchField
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* header end */}

      {/* Scrollable contacts list */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length > 0 ? (
          contacts.map((contact) => {
            const lastMessage = getLastMessage(contact.id);

            return (
              <div
                key={contact.id}
                className={`w-full px-4 flex gap-2 cursor-pointer ${contact.id === selectedContactId ? "bg-gray-100" : ""}`}
                onClick={() => onContactClick(contact)}
              >
                <div className="flex justify-center items-center">
                  <div className="w-12 h-12 rounded-full flex justify-center items-center bg-sky-900">
                    <p className="text-white text-base">{contact.name.charAt(0)}</p>
                  </div>
                </div>

                <div className="w-full border-b gap-2 flex justify-between py-4 pl-2 pr-4">
                  <div className="flex flex-col justify-start">
                    <p className="text-base font-semibold">{contact.name}</p>
                    <p className="text-primary dark:text-primary text-sm">
                      {lastMessage?.text
                        ? lastMessage.text.length > 40
                          ? `${lastMessage.text.substring(0, 40)}...`
                          : lastMessage.text
                        : 'No messages yet'}
                    </p>
                  </div>
                  {lastMessage?.createdAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center px-4">No contacts found</p>
        )}
      </div>

      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ContactList;
