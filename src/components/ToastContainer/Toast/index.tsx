import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  id: string;
  title: string;
  type: 'info' | 'success' | 'error';
  description?: string;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  type,
  description,
}: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [removeToast, id]);

  return (
    <Container type={type}>
      {type === 'info' && <FiInfo size={20} />}
      {type === 'success' && <FiCheckCircle size={20} />}
      {type === 'error' && <FiAlertCircle size={20} />}

      <div>
        <strong>{title}</strong>

        {description && <p>{description}</p>}
      </div>

      <button onClick={() => removeToast(id)}>
        <FiX size={14} />
      </button>
    </Container>
  );
}

export default Toast;
