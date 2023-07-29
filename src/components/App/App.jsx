import { Component } from 'react';
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

export class App extends Component {
  state = {
    inputValue: '',
    gallery: [],
    page: 1,
    perPage: 12,
    showModal: false,
    modalUrl: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, page, perPage } = this.state;

    if (
      prevState.inputValue !== inputValue ||
      (prevState.page !== page && page > 1)
    ) {
      this.setState({ isLoading: true });
      this.getPictures(inputValue, page, perPage);
    }
    window.scrollBy(0, window.innerHeight);
  }

  getPictures = async (query, page, perPage) => {
    try {
      const images = await Api.fetchGallery(query, page, perPage);
      if (!images.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query "${query}". Please try again.`
        );
      }
      this.setState(prev => ({
        gallery: [...prev.gallery, ...images],
      }));
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = searchInput => {
    const { inputValue } = this.state;
    if (inputValue === searchInput) {
      Notiflix.Notify.info(
        `Your request "${searchInput}" has already been completed! :-)`
      );
      return;
    }
    this.setState({ gallery: [], inputValue: searchInput, page: 1 });
    this.getPictures(searchInput, 1, this.state.perPage);
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalOpen = url => {
    this.setState({ modalUrl: url });
  };

  render() {
    const { gallery, showModal, loading, modalUrl, perPage } = this.state;

    const { handleSearch, toggleModal, handleModalOpen, handleLoadMore } = this;

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
            gallery={gallery}
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
  }
}
