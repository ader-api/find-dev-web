import React, {
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface MessageProps {
  id: string;
  title: string;
  type: 'info' | 'success' | 'error';
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<MessageProps, 'id'>): void;
  removeToast(id: string): void;
}

// Context
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// Component
const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const addToast = useCallback(({
    title,
    type,
    description
  }: Omit<MessageProps, 'id'>) => {
    const toast = {
      id: uuid(),
      title,
      type,
      description,
    };

    setMessages([...messages, toast]);
  }, [messages]);

  const removeToast = useCallback((id: string) => {
    const filteredMessages = messages.filter(message => message.id !== id);

    setMessages([...filteredMessages]);
  }, [messages]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

// Hook
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if(!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast }
