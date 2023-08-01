import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <GalleryItem onClick={() => openModal(image.largeImageURL)}>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
    </GalleryItem>
  );
};
