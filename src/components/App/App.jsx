import React, { useState, useEffect } from 'react';
import { GlobalStyles } from 'components/GlobalStyle';
import { Layout } from './App.styled';
import {
  ErrorBoundary,
  Searchbar,
  ImageGallery,
  Modal,
  Button,
  Loader,
} from '../index';

import Notiflix from 'notiflix';
import * as Api from '../services/pixabay-api';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) return;
    setLoading(true);
    getPictures(inputValue, page, perPage);

    window.scrollBy(0, window.innerHeight);
  }, [inputValue, page, perPage]);

  const getPictures = async (query, page, perPage) => {
    try {
      const images = await Api.fetchGallery(query, page, perPage);
      if (!images.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query "${query}". Please try again.`
        );
      }
      setGallery(prevGallery => [...prevGallery, ...images]);
    } catch (error) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  //  infinite scroll

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = searchInput => {
    if (inputValue === searchInput) {
      Notiflix.Notify.info(
        `Your request "${searchInput}" has already been completed! :-)`
      );
      return;
    }
    setGallery([]);
    setInputValue(searchInput);
    setPage(1);
    getPictures(searchInput, 1, perPage);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleModalOpen = url => {
    setModalUrl(url);
  };

  return (
    <Layout>
      <ErrorBoundary fallback="Sorry something went wrong ">
        <GlobalStyles />
        {showModal && (
          <Modal modalImg={modalUrl} onClose={toggleModal}>
            <img src={modalUrl} alt={gallery.tags} />
          </Modal>
        )}
        <Searchbar handleSearch={handleSearch} />
        <ImageGallery
          images={gallery}
          openModal={toggleModal}
          modalUrl={handleModalOpen}
        />
        {loading && <Loader />}
        {gallery.length >= perPage && !loading && (
          <Button loadMore={handleLoadMore} />
        )}
      </ErrorBoundary>
    </Layout>
  );
};
