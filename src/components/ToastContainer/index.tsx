import React from 'react';

import Toast from './Toast';

import {
  Container,
} from  './styles';

interface MessageProps {
  id: string;
  title: string;
  type: 'info' | 'success' | 'error';
  description?: string;
}

interface ToastContainerProps {
  messages: MessageProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast
          key={message.id}
          id={message.id}
          title={message.title}
          type={message.type}
          description={message.description}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
