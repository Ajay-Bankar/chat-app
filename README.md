WhatsApp-Like Chat App Documentation  ( Indexedb functionality still pending )
Overview:
This project is a messaging application with a chat interface that mimics WhatsApp's structure, consisting of three primary areas: a Contact List, a Chat Window, and a Message Field. The app allows users to send and receive messages in real-time, while also providing offline capabilities using IndexedDB to store messages.


Core Features :
Contact List: Displays a list of contacts on the left side.
Chat Window: Displays the chat history of the selected contact on the right side.
Message Field: Allows users to type and send new messages.
Message Storage: Uses InstantDB for real-time message storage.
Search Functionality: Allows users to search for contacts using a search field.
Offline Storage: IndexedDB is used to store data locally for offline functionality.
Responsive Design: Tailwind CSS is used to ensure the app is fully responsive and works across all devices.

Key Components :
1. AddContactModal
Purpose: Used for adding new contacts to the contact list.
Functionality:
Allows users to input new contact details.
On form submission, the new contact is added to the contact list and stored in IndexedDB.

3. ChatWindow:
Purpose: Displays the conversation history with the selected contact.
Functionality:
Shows the list of messages exchanged with the contact.
Displays messages in real-time using InstantDB for message storage and retrieval.
Provides an input field for typing new messages and a button to send them.

5. ContactList:
Purpose: Displays a list of all available contacts on the left side of the screen.
Functionality:
Allows users to click on a contact to view the conversation history in the ChatWindow.
Fetches the contact list from IndexedDB for offline access.

7. SearchField:
Purpose: Provides functionality to search for specific contacts.
Functionality:
Filters the contact list as the user types in the search bar.
Core Technologies and Libraries

InstantDB:
InstantDB is used for real-time message storage. It ensures that messages are stored and retrieved instantly as the user interacts with the app. When a new message is sent, it is stored in InstantDB, and when a contact is selected, the app retrieves the chat history for that contact.

IndexedDB:
IndexedDB is used to store chat messages and contact information locally. It allows the app to function offline, ensuring that users can still send and receive messages without an internet connection. The data is synchronized with InstantDB once an internet connection is available.


Hooks

useState:
Used for managing local state, such as the selected contact, the list of contacts, and the message input.

useEffect:
Used to handle side effects, such as fetching contact data from IndexedDB, updating the chat window when a contact is selected, and syncing offline messages with InstantDB.

useMemo:
Used for memoizing expensive calculations, like filtering the contact list during a search, to ensure that the component re-renders efficiently.

useReducer:
Used to manage complex state logic, such as handling multiple actions related to message sending, contact selection, and message storage.

Custom Hooks:
useContacts: A custom hook that interacts with IndexedDB to fetch, add, and delete contacts.
useMessages: A custom hook that interacts with InstantDB to fetch, send, and store messages.
useOfflineStorage: A custom hook that handles syncing data between InstantDB and IndexedDB when the app is offline.

Styling:
The app uses Tailwind CSS for responsive styling. Flexbox is used to create a responsive layout, ensuring the app adapts to all screen sizes, from mobile to desktop. Key responsive design elements include:

Flexbox: To create flexible layouts that adjust based on screen size.
Responsive Classes: Tailwind’s responsive design classes ensure the app looks good on all devices (e.g., md:flex, lg:grid, sm:hidden).
Local Storage and Offline Capabilities
The app uses IndexedDB to store chat data locally, allowing users to continue using the app even without an internet connection. Messages are stored in IndexedDB until a connection is re-established, at which point they are synced with InstantDB.

Setup Instructions:
1. Prerequisites
Ensure the following are installed on your system:

Node.js (v16 or higher)
npm (Node Package Manager)
Git

2. Clone the Repository
Run the following command in your terminal:

git clone [https://github.com/Ajay-Bankar/chat-app.git]
cd [chat-app]

3. Install Dependencies
Install all necessary packages using npm:
npm install

4. Start the Application
Run the development server:
npm run dev
http://localhost:3000
and open 
