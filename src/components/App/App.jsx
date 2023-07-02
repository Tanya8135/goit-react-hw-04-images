import { useState, useEffect } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fetchImages } from 'api/config';

import style from './App.module.css';

const initialState = {
  loading: false,
  images: [],
  currentPage: 1,
  query: '',
};

const App = () => {
  const [state, setState] = useState(initialState);

  const handleAddImages = async (query, nextPage = null) => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    try {
      const images = await fetchImages(query, nextPage || state.currentPage);
      const newImages = nextPage ? [...state.images, ...images] : images;

      setState(prevState => ({
        ...prevState,
        images: newImages,
        currentPage: nextPage ? nextPage : 1,
        query,
      }));
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (state.images.length === 0) {
      return; // Не виконувати запит при першому рендері, якщо масив images порожній
    }

    const { query } = state;
    setState(prevState => ({
      ...prevState,
      images: [],
    }));
    handleAddImages(query);
  }, [state.query]);

  const handleLoadMore = () => {
    const { query, currentPage } = state;
    const nextPage = currentPage + 1;
    handleAddImages(query, nextPage);
  };

  const handleToggleModule = imageURL => {
    setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  const { loading, images, showModal, selectedImage } = state;
  const showButton = images.length > 11;
  const searching = loading && !showButton;

  return (
    <div className={style.appBox}>
      <SearchBar onSubmit={handleAddImages} />
      <ImageGallery images={images} onImageClick={handleToggleModule} />
      {showButton && <Button onClick={handleLoadMore} isDisabled={loading} />}
      {loading && !searching && <Loader />}
      {showModal && (
        <Modal imageUrl={selectedImage} onClose={handleToggleModule} />
      )}
    </div>
  );
};

export default App;
