import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal, getModalUrl }) => {
  return (
    <GalleryItem onClick={() => getModalUrl(image.largeImageURL)}>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
    </GalleryItem>
  );
};
