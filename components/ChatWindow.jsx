'use client';

import { IoIosArrowBack } from 'react-icons/io';
import { useMessages } from '@/hooks/useMessages';
import { useScreenSize } from '@/hooks/useScreenSize'; // Import the useScreenSize hook
import { IoSend } from "react-icons/io5";

const ChatWindow = ({ contact, onBack }) => {
  const { isSmallScreen } = useScreenSize(); // Use the hook to get screen size
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isLoading,
    error,
  } = useMessages(contact?.id);

  if (!contact?.id) {
    return <div>No contact selected.</div>;
  }

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div>Error loading messages: {error.message}</div>;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Contact Header */}
      <div className="flex p-4 justify-start items-center gap-2 bg-gray-100">
        {/* Conditionally render the back button based on screen size */}
        {isSmallScreen && (
          <button onClick={onBack} className="text-lg">
            <IoIosArrowBack className=' text-[24px]' />
          </button>
        )}
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-sky-900">
          <p className="text-white text-sm">{contact.name?.charAt(0)}</p>
        </div>
        <div>
          <p className="text-base font-semibold">{contact.name}</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto mb-14">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="p-2 bg-slate-200 my-4 rounded-md">
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t sm:static sm:border-0">
        <div className="flex gap-2">
          <input
            type="text"
            className="p-4 w-full rounded-xl border"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="p-5 bg-blue-500 text-white rounded-full"
            onClick={sendMessage}
          >
           <IoSend className=' text-[24px]' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
