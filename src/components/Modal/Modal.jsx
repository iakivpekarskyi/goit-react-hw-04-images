import React, { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscKeyDown = event => {
      if (event.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <>
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>
    </>
  );
};
