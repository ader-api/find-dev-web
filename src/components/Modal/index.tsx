import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ReactModal from 'react-modal';

interface IUser {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          padding: '30px 55px',
          transform: 'translate(-50%, -50%)',
          background: colors.backgroundColor,
          color: colors.textColor,
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
