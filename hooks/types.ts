export interface Contact {
    id: string;
    name: string;
    createdAt: string;
  }
  
 // types.ts
export interface Message {
    id: string;
    contactId: string;
    text: string;
    createdAt: string;
  }
  