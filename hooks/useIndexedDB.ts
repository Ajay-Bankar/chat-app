import { useEffect } from 'react';
import type { Contact, Message } from './types';

interface DBSchema {
  contacts: Contact[];
  messages: Message[];
}

const DB_NAME = 'ChatAppDB';
const DB_VERSION = 1;

export const useIndexedDB = () => {
  // Initialize IndexedDB
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('contacts')) {
          db.createObjectStore('contacts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { keyPath: 'id' });
        }
      };
    });
  };

  // Store data in IndexedDB
  const storeData = async (storeName: keyof DBSchema, data: any) => {
    try {
      const db = await initDB();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      if (Array.isArray(data)) {
        data.forEach(item => store.put(item));
      } else {
        store.put(data);
      }

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error(`Error storing data in ${storeName}:`, error);
      throw error;
    }
  };

  // Retrieve data from IndexedDB
  const getData = async (storeName: keyof DBSchema): Promise<any[]> => {
    try {
      const db = await initDB();
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error retrieving data from ${storeName}:`, error);
      throw error;
    }
  };

  return {
    storeData,
    getData
  };
};