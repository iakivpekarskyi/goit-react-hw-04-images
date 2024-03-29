import { GalleryWrap } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryWrap>
      {images.map(image => (
        <ImageGalleryItem
          key={image.webformatURL}
          image={image}
          openModal={openModal}
        />
      ))}
    </GalleryWrap>
  );
};
