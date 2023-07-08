import { useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './Modal.module.css';

const Modal = ({ imageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const closeModal = () => {
    onClose();
  };

  return (
    <div className={style.overlay} onClick={closeModal}>
      <div className={style.modal}>
        <img src={imageUrl} alt={alt} width={800} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
