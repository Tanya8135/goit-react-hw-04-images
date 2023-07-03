import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './Modal.module.css';

const Modal = ({ imageUrl, alt, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    onClose();
  };

  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);

    return (
      <div className={style.overlay} onClick={handleCloseModal}>
        <div className={style.modal}>
          <img src={imageUrl} alt={alt} />
        </div>
      </div>
    );
  }

  document.removeEventListener('keydown', handleKeyDown);

  return null;
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
