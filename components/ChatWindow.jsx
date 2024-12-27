'use client';

import { useMessages } from '@/hooks/useMessages';

const ChatWindow = ({ contact }) => {
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isLoading,
    error
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
    <div className="h-screen flex flex-col justify-between">
      <div className="flex p-4 justify-start items-center gap-2 bg-gray-100">
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-sky-900">
          <p className="text-white text-sm">{contact.name?.charAt(0)}</p>
        </div>
        <div>
          <p className="text-base font-semibold">{contact.name}</p>
        </div>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
  {messages.map((msg, index) => (
    <div key={msg.id || index} className="p-2 bg-slate-200 my-2 rounded-md">
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


      <div className="flex gap-2 p-4 bg-gray-100 ">
        <input
          type="text"
          className="p-2 w-full rounded-md border"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
