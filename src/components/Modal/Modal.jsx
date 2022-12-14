import { createPortal } from 'react-dom';
import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalGallery } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ largeImage, tag, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalGallery>
        <img src={largeImage} alt={tag} loading="lazy" />
      </ModalGallery>
    </Overlay>,
    modalRoot
  );
}

Modal.proptype = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default memo(Modal);
