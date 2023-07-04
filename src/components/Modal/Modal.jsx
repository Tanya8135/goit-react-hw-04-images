import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';

import 'basiclightbox/dist/basicLightbox.min.css';

import style from './Modal.module.css';

const Modal = ({ imageUrl, alt }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const instance = basicLightbox.create(`
        <div class="${style.modal}">
          <img src="${imageUrl}" alt="${alt}" width="800" />
        </div>
    `);

    modalRef.current = instance;

    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        modalRef.current.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    modalRef.current.show();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      modalRef.current.close();
    };
  }, [imageUrl, alt]);

  return <div className={style.overlay}></div>;
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
