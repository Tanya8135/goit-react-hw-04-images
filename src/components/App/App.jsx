import { useState, useEffect } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fetchImages } from 'api/config';

import style from './App.module.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleAddImages = async (query, nextPage = null) => {
    setLoading(true);

    try {
      const fetchedImages = await fetchImages(query, nextPage || currentPage);
      const newImages = nextPage
        ? [...images, ...fetchedImages]
        : fetchedImages;

      setImages(newImages);
      setCurrentPage(nextPage ? nextPage : 1);
      setQuery(query);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    setImages([]);
    handleAddImages(query);
  }, [query]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    handleAddImages(query, nextPage);
  };

  const handleToggleModal = imageURL => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(imageURL);
  };

  const showButton = images.length > 11;
  const searching = loading && !showButton;

  return (
    <div className={style.appBox}>
      <SearchBar onSubmit={handleAddImages} />
      <ImageGallery images={images} onImageClick={handleToggleModal} />
      {showButton && <Button onClick={handleLoadMore} isDisabled={loading} />}
      {loading && !searching && <Loader />}
      {showModal && (
        <Modal imageUrl={selectedImage} onClose={handleToggleModal} />
      )}
    </div>
  );
};

export default App;
